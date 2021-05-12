import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';
import escape from 'validator/lib/escape';
import trim from 'validator/lib/trim';
import isEmail from 'validator/lib/isEmail';
import isPostalCode from 'validator/lib/isPostalCode';
import normalizeEmail from 'validator/lib/normalizeEmail';

import { unsubscribeUser } from '@/db/users';
import database from '@/middleware/database';
import { sendMail } from '@/lib/mail';

const handler = nc();

handler.use(database);

handler.post(async (req, res) => {
  var { email } = req.body;

  email = trim(escape(email));

  if (isEmpty(email) || !isEmail(email)) {
    res.status(400).send('Please try a valid email address.');
    return;
  }

  email = normalizeEmail(email);
  try {
    const user = await unsubscribeUser(req.db, email);
    if (user.value) {
      // send mail to user
      const msg = {
        to: email,
        from: {
          email: process.env.EMAIL_FROM,
          name: 'Find a Vaccine',
        },
        templateId: 'd-097f0a9c72e7453da6070d039a41b542', // unsubscribe template
      };
      await sendMail(msg);
      res.status(200).send('Success');
    } else {
      res.status(200).send('Success');
      return;
    }
  } catch (error) {
    console.log(`Database error: ${error}`);
    res.status(400).send('Something went wrong, please try again.');
    return;
  }
});

export default handler;
