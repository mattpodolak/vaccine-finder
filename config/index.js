const env = process.env.NODE_ENV;

export const server =
  env == 'production' ? 'https://findavaccine.ca' : 'http://localhost:3000';
