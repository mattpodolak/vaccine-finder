import pandas as pd
import sys
import os
import time
from pymongo import MongoClient
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.DEBUG)
log = logging.getLogger(__name__)

load_dotenv()
db_name = "hotspot"
collection = "users"
db_uri = os.getenv('DB_URI')

# update case issues in postal codes
with MongoClient(db_uri) as client:
  col = client[db_name][collection]
  updated = 0

  users = list(col.find({}))
  for user in users:
    user['postal_code'] = user['postal_code'].upper()
    x = col.update_one({"_id": user['_id']}, {'$set': user})
    updated += x.modified_count

  log.info(f'Updated {updated} users')





  
