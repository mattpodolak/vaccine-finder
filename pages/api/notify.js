import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';
import escape from 'validator/lib/escape';
import trim from 'validator/lib/trim';
import isEmail from 'validator/lib/isEmail';

const handler = nc();

handler.post(async (req, res) => {
  var { email } = req.body;

  email = trim(escape(email));

  if (isEmpty(email)) {
    res.status(400).send('Email is required.');
    return;
  } else if (!isEmail(email)) {
    res.status(400).send('Valid email is required.');
    return;
  }

  res.status(200).send('Success');
  return;
});

export default handler;
