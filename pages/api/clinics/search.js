import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';
import escape from 'validator/lib/escape';
import trim from 'validator/lib/trim';
import isPostalCode from 'validator/lib/isPostalCode';
import database from '@/middleware/database';
import { findClinics } from '@/db/clinics';

const handler = nc();

handler.use(database);

const available = [
  {
    _id: 'sajlajsdj',
    name: 'CAMH Vaccination Clinic',
    status: 'Accepting Online Bookings',
    booking_link:
      'http://www.camh.ca/en/camh-news-and-stories/covid-19-vaccine-booking',
    eligibility:
      'Adults age 50+ in COVID-19 Hot Spots Communities M5V, M6E, M6H, M6K, M6N, M8V postal code regions (proof of address required)',
  },
  {
    _id: 'asklnjkc',
    name: 'CAMH Vaccination Clinic',
    status: 'Accepting Online Bookings',
    booking_link:
      'http://www.camh.ca/en/camh-news-and-stories/covid-19-vaccine-booking',
    eligibility:
      'Adults age 50+ in COVID-19 Hot Spots Communities M5V, M6E, M6H, M6K, M6N, M8V postal code regions (proof of address required)',
  },
];

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

    res.status(200).json({
      available: clinics.map((clinic) => {
        return {
          _id: clinic._id,
          name: clinic.name,
          booking_link: clinic.booking_link,
          eligibility: clinic.eligibility,
          lastUpdated: clinic.lastUpdated,
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
