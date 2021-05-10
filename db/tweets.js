export async function findInfo(db) {
  const latestTweet = await db
    .collection('clinics')
    .aggregate([
      { $match: { source: 'twitter' } },
      { $sort: { lastUpdated: -1 } },
      {
        $group: {
          _id: '$screen_name',
          screen_name: { $first: '$screen_name' },
          since_id: { $first: '$id' },
          name: { $first: '$name' },
        },
      },
    ])
    .toArray();
  return latestTweet;
}

export async function findTweetById(db, id) {
  return db
    .collection('clinics')
    .findOne({
      source: 'twitter',
      id,
    })
    .then((tweet) => tweet || null);
}

export async function insertClinic(db, clinic) {
  return db.collection('clinics').insertOne(clinic);
}
