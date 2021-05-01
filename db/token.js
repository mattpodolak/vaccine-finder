export async function findTokenById(db, id) {
  return db
    .collection('tokens')
    .findOne({
      id,
    })
    .then((token) => token || null);
}
