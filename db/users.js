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
