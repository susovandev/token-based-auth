import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const _config = {
    node_env: process.env.NODE_ENV,
    port: Number(process.env.PORT) || 4001,
    database_Url: process.env.DATABASE_URL,
};

export const config = Object.freeze(_config);
