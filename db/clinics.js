export async function findInfo(db) {
  const numClinics = await db.collection('clinics').countDocuments();
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

export async function findClinicByName(db, name) {
  return db
    .collection('clinics')
    .findOne({
      name,
    })
    .then((clinic) => clinic || null);
}

export async function insertClinic(
  db,
  { name, status, eligibility, booking_link, postal_code, age }
) {
  return db.collection('clinics').findOneAndUpdate(
    { name },
    {
      $set: {
        name,
        status,
        eligibility,
        booking_link,
        postal_code,
        age,
        lastUpdated: new Date(),
      },
    },
    { upsert: true }
  );
}
