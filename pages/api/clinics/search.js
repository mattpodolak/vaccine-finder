import nc from 'next-connect';
import isEmpty from 'validator/lib/isEmpty';
import escape from 'validator/lib/escape';
import trim from 'validator/lib/trim';
import isPostalCode from 'validator/lib/isPostalCode';

const handler = nc();

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
    res.status(400).send('Postal Code is required.');
    return;
  } else if (!isPostalCode(postalCode, 'CA')) {
    res.status(400).send('Postal Code is required.');
    return;
  }

  const available = [
    {
      _id: 'sajlajsdj',
      name: 'CAMH Vaccination Clinic',
      host: 'Centre for Addiction and Mental Health',
      status: 'Accepting Online Bookings',
      website: 'http://www.camh.ca/covidvaccine',
      address: '100 Stokes Street, Toronto, Ontario M6J1H4',
      distance: 10,
      booking_link:
        'http://www.camh.ca/en/camh-news-and-stories/covid-19-vaccine-booking',
      eligibility:
        'Adults age 50+ in COVID-19 Hot Spots Communities M5V, M6E, M6H, M6K, M6N, M8V postal code regions (proof of address required)',
    },
    {
      _id: 'asklnjkc',
      name: 'CAMH Vaccination Clinic',
      host: 'Centre for Addiction and Mental Health',
      status: 'Accepting Online Bookings',
      website: 'http://www.camh.ca/covidvaccine',
      address: '100 Stokes Street, Toronto, Ontario M6J1H4',
      distance: 10,
      booking_link:
        'http://www.camh.ca/en/camh-news-and-stories/covid-19-vaccine-booking',
      eligibility:
        'Adults age 50+ in COVID-19 Hot Spots Communities M5V, M6E, M6H, M6K, M6N, M8V postal code regions (proof of address required)',
    },
  ];

  // res.status(200).json({ available });
  res.status(200).json({ available: [] });
  return;
});

export default handler;
