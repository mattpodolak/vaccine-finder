import nc from 'next-connect';
import { findInfo } from '@/db/clinics';
import database from '@/middleware/database';

const handler = nc();

handler.use(database);

handler.get(async (req, res) => {
  const info = await findInfo(req.db);
  const { numClinics, lastUpdated } = info;
  res.status(200).json({ clinics: numClinics, lastUpdate: lastUpdated });
});

export default handler;
