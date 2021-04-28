const env = process.env.NODE_ENV;

export const server =
  env == 'production' ? 'https://getvaccinated.co' : 'http://localhost:3000';
