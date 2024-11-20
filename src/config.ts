import 'dotenv/config';

export const {
  PORT = 8010,
  MONGODB_URI = '',
  API_KEY = '',
} = process.env;