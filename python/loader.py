import pandas as pd
import os
import time
from dotenv import load_dotenv
import logging
import requests

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

load_dotenv()
api_url = os.getenv('API_URL')
api_key = os.getenv('API_KEY')
secret = os.getenv('SECRET_KEY')


# load extracted products
clinics = pd.read_csv('./clinics.csv')
log.info(f"{len(clinics)} clinics loaded from CSV")

# use API to update
for i, row in clinics.iterrows():
    payload = {"notify": True, **row}
    log.info(f'Updating {row["name"]}')
    resp = requests.post(f'{api_url}/api/clinics/update', data=payload, auth=(api_key, secret) )
    status = resp.status_code
    if status == 200:
        log.info(resp.text)
    else:
        log.warn(f'Request failed for {row["name"]}: {resp.text}')