// backend/db.js
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { join } from 'path';

// Load env explicitly
dotenv.config({ path: join(process.cwd(), 'backend', '.env') });

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

export default pool;
