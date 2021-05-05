import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';

import passport from '@/middleware/passport';
import database from '@/middleware/database';
import { insertClinic } from '@/db/tweets';
import { findUsersByClinics } from '@/db/users';
import { sendMail } from '@/lib/mail';

const handler = nc();

handler.use(database);
handler.use(passport.initialize());
handler.use(passport.authenticate('basic', { session: false }));

// update clinics stored in database
// notify users based on clinic
handler.post(async (req, res) => {
  const {
    id = '',
    name = '',
    screen_name = '',
    lastUpdated = '',
    eligibility = '',
    postal_code = '',
    status = '',
    age = '',
    booking_link = '',
    notify = false,
    source = 'twitter',
  } = req.body;
  if (isEmpty(screen_name) || isEmpty(id)) {
    res.status(400).send('Missing required field.');
    return;
  }

  const newClinic = {
    id, //cant parse as a number since it breaks and rounds off
    name,
    screen_name,
    lastUpdated: new Date(lastUpdated + ' UTC'),
    eligibility,
    postal_code,
    status,
    age: parseInt(age),
    booking_link,
    notify,
    source,
  };

  let users = [];

  try {
    if (newClinic.status === 'open') {
      users = await findUsersByClinics(req.db, { newClinic });
    }
  } catch (error) {
    console.log('User notification error ', error);
    res.status(400).send('Something went wrong when notifying users');
    return;
  }

  try {
    // TODO: notify users
    // TODO: log user ids notified
    if (notify) {
      for (var i in users) {
        const user = users[i];
        console.log(`Notifying ${user._id} for ${name}`);

        // send mail to user
        const msg = {
          to: user.email,
          from: {
            email: process.env.EMAIL_FROM,
            name: 'Find a Vaccine',
          },
          templateId: !isEmpty(booking_link)
            ? 'd-41fced3a5db94251aa8c2169b2ee111f' // notify template
            : 'd-1df9f3fe347a499992f33b6170c85db3', // notify no link template
          dynamicTemplateData: {
            name,
            screen_name,
            booking_link,
            eligibility,
            source,
          },
        };

        await sendMail(msg);
      }
    }
  } catch (error) {
    console.log('User notify error ', error);
    res.status(400).send('Something went wrong when notifying users');
    return;
  }

  try {
    await insertClinic(req.db, newClinic);
    res.status(200).send({ msg: 'Update successful', notify: users.length });
    return;
  } catch (error) {
    console.log('Clinic insert error ', error);
    res.status(400).send('Something went wrong when updating clinics');
    return;
  }
});

export default handler;
