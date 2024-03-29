import re
import os
import pandas as pd
import numpy as np
import pickle
import requests
import json
import boto3
from os import path
import logging

log = logging.getLogger(__name__)
log.setLevel(logging.INFO)

# load credentials for S3
S3_ACCESS_KEY = os.getenv("S3_ACCESS_KEY")
S3_SECRET_KEY = os.getenv("S3_SECRET_KEY")

class TweetExtract(object):
    
    def __init__(self):
        self.age_pat = re.compile(r"(\d{2})\+")
        self.year_pat = re.compile(r"(Born|born).*(19\d{2})")
        self.postal_pat = re.compile(r"[A-Z]\d[A-Z]")
        self.address_pat = re.compile(r".*(\d+.*\s(?:st|rd|dr|ave|blvd|hwy|edge))(\s|\W|\b)", re.IGNORECASE)
        self.sub_addr_pat = re.compile(r"(?:\d+\s*[\-]*)+(?:\s\w+)*\s(?:st|rd|dr|ave|blvd|hwy)(?:(?:[\s\.]\d+)|(?:,(?:\s*\w+)*)+)?", re.IGNORECASE)
        self.street_pat = re.compile(r"(street|road|drive|boulevard|avenue|highway)", re.IGNORECASE)
        self.st_lookup = {'street': 'st', 'road': 'rd', 'drive': 'dr', 'boulevard': 'blvd', 'avenue':'ave', 'highway':'hwy'}
        self.t_link_pat = re.compile(r"https:\/\/t.co\/\w+")
        self.province_pat = re.compile(r"\[(\w{2})\]")
        self.all_postal_pat = re.compile(r'(?:(?:["\'(‘]([A-Z])["\'’)].*(?:HOTSPOT|hotspot|Hotspot|hot spot))|(?:(?:HOTSPOT|hotspot|Hotspot|hot spot).*["\'(‘]([A-Z])["\'’)]))')
        self.num_match = 0
        
        self.API_KEY = os.getenv('GOOGLE_API_KEY')
        self.api_url = os.getenv('API_URL')
        self._s3 = boto3.client('s3')

        # load hotspot postals
        self.hotspot_postals()
        
        self._radius = [self.km_to_rad(2.5)] # search in 2.5km radius

    def hotspot_postals(self):
        resp = requests.get(f'{self.api_url}/api/clinics/postal')
        if resp.status_code == 200:
            try:
                codes = json.loads(resp.text)
                if(codes):
                    self.hotspot_map = codes['mapped']
            except Exception as e:
                self.hotspot_map = {}
                pass # do nothing
        
    def load_files(self, filenames, fileDir):
        log.info('Loading required files')
        for file in filenames:
            file_path = f"{fileDir}/{file}"
            if not path.exists(file_path):
                with open(file_path, 'wb') as f:
                    log.info(f'Downloading {file}')
                    self._s3.download_fileobj('twitter-extract-files', file, f)
        if not hasattr(self, '_fsa'):
            self.tree = pickle.load(open(f'{fileDir}/ball_postal_index.p', "rb"))
            self._fsa = np.asarray(pd.read_csv(f'{fileDir}/FSA.csv'))
        
    def get_age(self, full_text):
        extracted_age = None
        ages = self.age_pat.findall(full_text)
        year = self.year_pat.search(full_text)
        
        if(ages): # check for age
            min_age = ages[0]
            for age in ages:
                if age < min_age:
                    min_age = age
            extracted_age = min_age
        elif (year): # check for year if age not included
            extracted_age = 2021 - int(year.group(2))
            
        return extracted_age
    
    def gmaps(self,address):
        lat = lon = None
        payload= {'address': address,'components':'country:CA', 'key':self.API_KEY}
        payload_str = "&".join("%s=%s" % (k,v) for k,v in payload.items())
        resp = requests.get('https://maps.googleapis.com/maps/api/geocode/json',params=payload_str)
        if resp.status_code == 200:
            try:
                geodata = json.loads(resp.text)
                if(geodata):
                    lat = geodata["results"][0]["geometry"]["location"]['lat']
                    lon = geodata["results"][0]["geometry"]["location"]['lng']
            except Exception as e:
                pass # do nothing
        return lat, lon
    
    def search_address(self, address, sub_addr=None):
        g_lat, g_lon = self.gmaps(address)
        
        lat = g_lat
        lon = g_lon
        
        if(not lat and sub_addr):
            return self.search_address(sub_addr)
        
        return lat, lon
    
    # convert radians to km
    def rad_to_km(self,rad):
        r = 6371 # earth radius in km
        return rad*r # radians = arc_len / radius
    
    def km_to_rad(self,km):
        r = 6371 # earth radius in km
        return km/r # radians = arc_len / radius
    
    def deg_to_rad(self,x): # convert lat, lon pair from deg to radians
        return [float(x[0]) * np.pi / 180, float(x[1]) * np.pi / 180]
    
    def find_postals(self, lat, lon):
        # load postal codes and ANN index
        self.load_files(['FSA.csv', 'ball_postal_index.p'], '/tmp')
        point_rad = [np.array(self.deg_to_rad([lat, lon]))]
        ind = self.tree.query_radius(point_rad, r=self._radius)
        postals = np.unique(self._fsa[ind[-1]])
        return postals
        
    def get_postal(self, full_text):
        extracted_postal = []
        clean_text = self.t_link_pat.sub('', full_text)
        postals = self.postal_pat.findall(clean_text)
        all_postal = self.all_postal_pat.search(full_text)

        if all_postal:
            letter = all_postal.group(1) or all_postal.group(2)
            extracted_postal = self.hotspot_map.get(letter, [])
        elif postals: #check for postal code
            extracted_postal = postals
        else: # check for address
            lines = clean_text.split("\n")
            for line in lines:
                # replace street endings to standardize
                st_match = self.street_pat.search(line)
                if st_match:
                    street = st_match.group(0)
                    sub = self.st_lookup[street.lower()]
                    line = re.sub(street, sub, line)
               
                # search for address
                match = self.sub_addr_pat.search(line)
                if match:
                    addr = match.group(0)
                    prov = self.province_pat.search(full_text) # extract province
                    if prov:
                        full_addr = f'{addr}, {prov.group(1)}'
                    else:
                        full_addr = addr
                    lat,lon = self.search_address(full_addr)
                    
                    if(lat):                        
                        # extract nearby postal codes
                        extracted_postal = self.find_postals(lat,lon)
        
        return extracted_postal
        
    def single_tweet_extract(self, tweet):
        t_data = dict()
        
        if(tweet.in_reply_to_user_id):
            return t_data
        
        full_text = tweet.full_text

        age = self.get_age(full_text)
        postal_code = self.get_postal(full_text)

        if(age and len(postal_code) > 0):
            if len(tweet.entities['urls']) > 0:
                url = tweet.entities['urls'][0]['expanded_url']
            else:
                url = None

            t_data['id'] = tweet.id # use id for max_id
            t_data['name'] = tweet.user.name # Vaccine Hunters Canada
            t_data['screen_name'] = tweet.user.screen_name
            t_data['lastUpdated'] = tweet.created_at
            t_data['eligibility'] = full_text
            t_data['postal_code'] = postal_code
            t_data['status'] = "open"
            t_data['age'] = age
            t_data['booking_link'] = url
        elif(hasattr(tweet, 'quoted_status')):
            return self.single_tweet_extract(tweet.quoted_status)

        return t_data
    
    def extract_tweets(self, tweets):
        valid_tweet_data = []
        for tweet in tweets:
            tweet_data = self.single_tweet_extract(tweet)
            if(tweet_data):
                valid_tweet_data.append(tweet_data)
        return valid_tweet_data