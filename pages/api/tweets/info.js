import nc from 'next-connect';

import database from '@/middleware/database';
import { findInfo } from '@/db/tweets';

const handler = nc();

handler.use(database);

// return most recent id, and screen_names for twitter accounts being tracked
handler.get(async (req, res) => {
  const latestTweets = await findInfo(req.db);

  res.status(200).json({ twitters: latestTweets });
});

export default handler;
