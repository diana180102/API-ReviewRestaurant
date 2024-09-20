import dotenv from 'dotenv';

dotenv.config();

export const config = {
    db:{
        host:process.env['PGHOST'] || 'localhost',
        port: Number(process.env['PGPORT']),
        user: process.env['PGUSER'],
        password: process.env['DB_PASSWORD'],
    },
    server: {
        port: process.env['PORT'] || 3000,
    }
}