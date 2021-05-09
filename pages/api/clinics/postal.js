import nc from 'next-connect';
import { findPostal } from '@/db/clinics';
import database from '@/middleware/database';

const handler = nc();

handler.use(database);

handler.get(async (req, res) => {
  const info = await findPostal(req.db);
  const mapped = {};
  if (info) {
    const postal = info[0]['postal_code'];
    for (var i in postal) {
      const code = postal[i];
      if (mapped[code.charAt(0)]) {
        mapped[code.charAt(0)].push(code);
      } else {
        mapped[code.charAt(0)] = [code];
      }
    }
  }
  res.status(200).json({ mapped });
});

export default handler;
