import nc from 'next-connect';
import { findInfo } from '@/db/clinics';
import database from '@/middleware/database';

const handler = nc();

handler.use(database);

handler.get(async (req, res) => {
  const info = await findInfo(req.db);
  res.status(200).json({ clinics: info.numClinics });
});

export default handler;
