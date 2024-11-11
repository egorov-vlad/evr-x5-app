import 'dotenv/config';

export const {
  PORT = 8010,
  MONGODB_URI = ''
} = process.env;