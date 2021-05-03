import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';

import passport from '@/middleware/passport';
import database from '@/middleware/database';
import { checkStatus, extractInfo } from '@/lib/extractInfo';
import { findClinicByName, insertClinic } from '@/db/clinics';
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
    name = '',
    status = '',
    eligibility = '',
    booking_link = '',
    notify = false,
    source = '',
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
    source,
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
          templateId: 'd-41fced3a5db94251aa8c2169b2ee111f',
          dynamicTemplateData: {
            name,
            booking_link,
            eligibility,
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
    res.status(200).send(`Update successful. Notified ${users.length} users`);
    return;
  } catch (error) {
    console.log('Clinic insert error ', error);
    res.status(400).send('Something went wrong when updating clinics');
    return;
  }
});

export default handler;
