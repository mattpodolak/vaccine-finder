import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';

import passport from '@/middleware/passport';
import database from '@/middleware/database';
import { checkStatus, extractInfo } from '@/lib/extractInfo';
import { findClinicByName, insertClinic } from '@/db/clinics';
import { findUsersByClinics } from '@/db/users';

const handler = nc();

handler.use(database);
handler.use(passport.initialize());
handler.use(passport.authenticate('basic', { session: false }));

// update clinics stored in database
// notify users based on clinic
handler.post(async (req, res) => {
  const {
    name = '',
    status = '',
    eligibility = '',
    booking_link = '',
    notify = false,
  } = req.body;
  if (isEmpty(name) || isEmpty(status)) {
    res.status(400).send('Missing required field.');
    return;
  }

  const { postal_code, age } = extractInfo(eligibility);

  const newClinic = {
    name,
    status: checkStatus(status),
    eligibility,
    booking_link,
    age,
    postal_code,
  };

  const oldClinic = await findClinicByName(req.db, name);
  let users = [];

  try {
    if (newClinic.status === 'open') {
      users = await findUsersByClinics(req.db, { oldClinic, newClinic });
    }
  } catch (error) {
    console.log('User notification error ', error);
    res.status(400).send('Something went wrong when notifying users');
    return;
  }

  try {
    // TODO: notify users
    if (notify) {
      console.log(`Notifying ${users.length} users`);
    }
  } catch (error) {
    console.log('User notify error ', error);
    res.status(400).send('Something went wrong when notifying users');
    return;
  }

  try {
    await insertClinic(req.db, newClinic);
    res.status(200).send(`Update successful. Notified ${users.length} users`);
    return;
  } catch (error) {
    console.log('Clinic insert error ', error);
    res.status(400).send('Something went wrong when updating clinics');
    return;
  }
});

export default handler;
