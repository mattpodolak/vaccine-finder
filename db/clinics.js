export async function findInfo(db) {
  const numClinics = await db.collection('clinics').count();
  const recentClinic = db
    .collection('clinics')
    .find()
    .sort({ lastUpdated: -1 })
    .limit(1);

  return { numClinics, lastUpdated: recentClinic['lastUpdated'] };
}

export async function findClinics(db, age, postal) {
  return db
    .collection('clinics')
    .find({
      age: { $lte: age },
      postal_code: { $eq: postal },
      status: { $eq: 'open' },
    })
    .toArray();
}
