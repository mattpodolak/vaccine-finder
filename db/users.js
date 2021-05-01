import { comparePostal } from '@/lib/extractInfo';

export async function findUserByEmail(db, email) {
  return db
    .collection('users')
    .findOne({
      email,
    })
    .then((user) => user || null);
}

export async function insertUser(db, { email, postal_code, age }) {
  return db
    .collection('users')
    .insertOne({
      email,
      postal_code,
      age,
    })
    .then(({ ops }) => ops[0]);
}

export async function findUsersByClinics(db, { oldClinic, newClinic }) {
  // compare for new postal codes
  const { new_codes, same_codes } = comparePostal(
    oldClinic.postal_code,
    newClinic.postal_code
  );

  // extract users that match new postal codes and gte new age
  const users_1 =
    (await db
      .collection('users')
      .find({
        age: { $gte: newClinic.age },
        postal_code: { $in: new_codes },
      })
      .toArray()) || [];
  // extract users that match old postal and new postal codes and (gte new age and lt old age)
  const users_2 =
    (await db
      .collection('users')
      .find({
        age: { $gte: newClinic.age, $lt: oldClinic.age },
        postal_code: { $in: same_codes },
      })
      .toArray()) || [];

  return users_1.concat(users_2);
}
