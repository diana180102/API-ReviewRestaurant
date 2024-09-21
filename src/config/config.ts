import dotenv from 'dotenv';

dotenv.config();

export const config = {
    db:{
        host:process.env['PGHOST'] || 'localhost',
        port: Number(process.env['PGPORT']),
        user: process.env['PGUSER'],
        password: process.env['DB_PASSWORD'],
        database: process.env['PGDATABASE'],
    },
    server: {
        port: process.env['PORT'] || 3000,
    },
    jwt: {
        secret: process.env['JWT_SECRET'] || 'your_default_secret_key',
    }
}