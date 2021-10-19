const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env') });

module.exports = {
    development: {
        username: process.env.USER_NAME,
        password: process.env.USER_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.HOST_DB,
        dialect: process.env.DIALECT_DB || 'postgres',
        minPool: process.env.MIN_BD_POOL || 0,
        maxPool: process.env.MAX_BD_POOL || 5
    },

    production: {
        username: process.env.USER_NAME,
        password: process.env.USER_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.HOST_DB,
        dialect: process.env.DIALECT_DB || 'postgres',
        minPool: process.env.MIN_BD_POOL || 0,
        maxPool: process.env.MAX_BD_POOL || 5
    }
};
