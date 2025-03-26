import {config} from 'dotenv';

// Load environment variables from .env file
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

// what env variables to export
export const { 
    PORT, NODE_ENV, 
    DB_URI, 
    JWT_SECRET, JWT_EXPIRES_IN, 
    ARCJET_ENV, ARCJET_KEY, 
    QSTASH_URL, QSTASH_TOKEN, QSTASH_CURRENT_SIGNING_KEY, QSTASH_NEXT_SIGNING_KEY
} = process.env;