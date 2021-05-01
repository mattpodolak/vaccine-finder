// function to extract array of postal codes, and age from an eligibility string
export const extractInfo = (eligibility) => {
  // extract age and postal code
  const postal_regexp = /[A-Z]\d[A-Z]/gm;
  const age_regexp = /(\d{2})\+/gm;

  const postal_code = eligibility.match(postal_regexp) || [];
  const match = [...eligibility.matchAll(age_regexp)];
  const age = match[0] ? parseInt(match[0][1]) : null;

  return { postal_code, age };
};

export const comparePostal = (oldPostal = [], newPostal) => {
  const new_codes = [];
  const same_codes = [];

  for (var i in newPostal) {
    const n_code = newPostal[i];
    if (!oldPostal.includes(n_code)) {
      new_codes.push(n_code);
    } else {
      same_codes.push(n_code);
    }
  }

  return { new_codes, same_codes };
};

export const checkStatus = (status) => {
  const open = [
    'open',
    'Accepting Online Bookings',
    'Accepting Pre-Registration',
  ];
  return open.includes(status) ? 'open' : 'closed';
};
