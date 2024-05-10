const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    ATLAS_URL: process.env.ATLAS_URL,
    SALT_ROUNDS: process.env.SALT_ROUNDS || 8,
    JWT_EXPIRY: process.env.JWT_EXPIRY || '1d',
    JWT_SECRET: process.env.JWT_SECRET || 'your@1k2b_secret@cd_key@k1y2z3',
}

