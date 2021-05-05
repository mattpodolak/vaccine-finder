export async function findInfo(db, screen_name) {
  const latestTweet = await db
    .collection('clinics')
    .find({ source: 'twitter', screen_name })
    .sort({ lastUpdated: -1 })
    .limit(1)
    .toArray();
  return latestTweet;
}

export async function insertClinic(db, clinic) {
  return db.collection('clinics').insertOne(clinic);
}
