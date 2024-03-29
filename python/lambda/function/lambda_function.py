import tweepy
import os
import requests
import json
from utils.TweetExtract import TweetExtract
from utils.notify import publish_message
import logging
import pandas as pd

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)
log.setLevel(logging.INFO)

consumer_key = os.getenv('TWITTER_CONSUMER_KEY')
consumer_secret = os.getenv('TWITTER_CONSUMER_SECRET')
api_url = os.getenv('API_URL')
api_key = os.getenv('API_KEY')
secret = os.getenv('SECRET_KEY')

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
api = tweepy.API(auth)

def lambda_handler(event, context):
  # load twitter info to use to scrape tweets
  log.info("Loading twitter metadata")
  resp = requests.get(f'{api_url}/api/tweets/info', auth=(api_key, secret) )
  status = resp.status_code
  if status == 200:
    r = json.loads(resp.text)
    twitters = r['twitters']
    log.info(f"Loaded metadata for {len(twitters)} twitter accounts")
  else:
    raise Exception("Last ID not found")

  for twitter in twitters:
    since_id = twitter["since_id"]
    screen_name = twitter["screen_name"]
    log.info(f'Loading tweets for {screen_name}')

    # check for latest tweets
    tweets = api.user_timeline(screen_name, include_rts=True, count=200, since_id=since_id, tweet_mode = 'extended')

    log.info(f'Loaded {len(tweets)} for {screen_name}')

    notified = 0
    success = 0
    failed = 0
    # check length, and extract if > 0
    if len(tweets) > 0:
      extract = TweetExtract()
      log.info('Starting tweet data extract')
      data = extract.extract_tweets(tweets)

      tweets_df = pd.DataFrame(data)

      for i, row in tweets_df.iterrows():
        payload = {"notify": True, **row}
        resp = requests.post(f'{api_url}/api/tweets/update', data=payload, auth=(api_key, secret) )
        status = resp.status_code
        if status == 200:
            r = json.loads(resp.text)
            notified += r["notify"]
            success += 1
        else:
            log.error(f'Request failed for {row["id"]}: {resp.text}')
            failed +=1
    stat_str = f'Loaded {success} tweets, notified {notified} users. Failed to load {failed} tweets'
    log.info(stat_str)
    publish_message(success, notified, failed)
    return stat_str
