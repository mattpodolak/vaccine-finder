import { relativeHours } from '@/lib/relativeDate';

export async function findInfo(db) {
  const numClinics = await db
    .collection('clinics')
    .countDocuments({ lastUpdated: { $gt: relativeHours(36) } });

  return { numClinics };
}

export async function findClinics(db, age, postal) {
  return db
    .collection('clinics')
    .find({
      age: { $lte: age },
      postal_code: { $eq: postal },
      status: { $eq: 'open' },
      lastUpdated: { $gt: relativeHours(36) },
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
  { name, status, eligibility, booking_link, postal_code, age, source }
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
        source,
        lastUpdated: new Date(),
      },
    },
    { upsert: true }
  );
}
