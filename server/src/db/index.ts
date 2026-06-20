import dotenv from 'dotenv';
import { Pool } from 'pg'

// Loads variables from .env into process.env
dotenv.config();

// Pool manages multiple database connections — more efficient than opening one per request
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Required for cloud Postgres providers like Neon that use self-signed SSL certificates
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool