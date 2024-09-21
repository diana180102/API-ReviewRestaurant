import { Pool } from 'pg';
import { config } from '../config/config';

export const db = new Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

db.connect()
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Error connecting to database:', err));