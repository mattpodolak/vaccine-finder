import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';
import escape from 'validator/lib/escape';
import trim from 'validator/lib/trim';
import isEmail from 'validator/lib/isEmail';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { findUserByEmail, insertUser } from '@/db/users';

const handler = nc();

handler.post(async (req, res) => {
  var { email, age, postalCode } = req.body;

  email = trim(escape(email));
  age = trim(escape(age));
  postalCode = trim(escape(postalCode));

  if (isEmpty(email) || !isEmail(email)) {
    res.status(400).send('Please try a valid email address.');
    return;
  }

  if (isEmpty(age)) {
    res.status(400).send('Age is required.');
    return;
  }

  try {
    age = parseInt(age);
  } catch (e) {
    res.status(400).send('Age should be a number.');
    return;
  }

  if (isEmpty(postalCode)) {
    res.status(400).send('Postal code is required.');
    return;
  } else if (!isPostalCode(postalCode, 'CA')) {
    res.status(400).send('Valid Canadian postal code is required.');
    return;
  }

  var shortPostal = '';

  try {
    shortPostal = postalCode.slice(0, 3);
  } catch (e) {
    res.status(400).send('Valid postal code is required.');
    return;
  }

  email = normalizeEmail(email);
  try {
    if (await findUserByEmail(req.db, email)) {
      // to keep signed up users secure we return success, but do not take action
      res.status(200).send('Success');
    } else {
      await insertUser(req.db, {
        email,
        postal_code: postalCode,
        age,
      });
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
