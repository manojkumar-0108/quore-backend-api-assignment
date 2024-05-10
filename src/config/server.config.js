const dotenv = require('dotenv');
dotenv.config();


module.exports = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    ATLAS_URL: process.env.ATLAS_URL
}