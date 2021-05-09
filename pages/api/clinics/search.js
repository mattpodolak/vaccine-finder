import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';
import escape from 'validator/lib/escape';
import trim from 'validator/lib/trim';
import isPostalCode from 'validator/lib/isPostalCode';
import database from '@/middleware/database';
import { findClinics, findInfo } from '@/db/clinics';

const handler = nc();

handler.use(database);

handler.post(async (req, res) => {
  var { age, postalCode } = req.body;

  age = trim(escape(age));
  postalCode = trim(escape(postalCode));

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

  try {
    postalCode = postalCode.toUpperCase();
  } catch (e) {
    res.status(400).send('Valid Canadian postal code is required.');
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
    res.status(400).send('Valid Canadian postal code is required.');
    return;
  }

  try {
    const clinics = await findClinics(req.db, age, shortPostal);
    const info = await findInfo(req.db);

    res.status(200).json({
      clinics: info.numClinics,
      available: clinics.map((clinic) => {
        return {
          _id: clinic._id,
          name: clinic.name,
          booking_link: clinic.booking_link,
          eligibility: clinic.eligibility,
          lastUpdated: clinic.lastUpdated,
          source: clinic.source,
          screen_name: clinic.screen_name,
        };
      }),
    });
    return;
  } catch (e) {
    console.log(`Database Error: ${e}`);
    res.status(400).send('Something went wrong, please try again.');
    return;
  }
});

export default handler;
