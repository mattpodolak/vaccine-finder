import nc from 'next-connect';

import passport from '@/middleware/passport';
import database from '@/middleware/database';
import { findInfo } from '@/db/tweets';

const handler = nc();

handler.use(database);
handler.use(passport.initialize());
handler.use(passport.authenticate('basic', { session: false }));

const twitters = [
  {
    screen_name: 'VaxHuntersCan',
    name: 'Vaccine Hunters Canada',
  },
];

// return most recent id, and screen_names for twitter accounts being tracked
handler.get(async (req, res) => {
  const info = [];
  for (var i in twitters) {
    const account = twitters[i];
    const latestTweet = await findInfo(req.db, account.screen_name);
    info.push({ ...account, since_id: latestTweet[0].id });
  }
  res.status(200).json({ twitters: info });
});

export default handler;
