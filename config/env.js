import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` }); // Use template literal

export const { PORT, NODE_ENV, DB_URI } = process.env;



