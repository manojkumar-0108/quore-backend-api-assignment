const mongoose = require('mongoose');
const { NODE_ENV, ATLAS_URL } = require('./server.config');
const { InternalServerError } = require('../errors');

async function connectToDB() {

    try {
        if (NODE_ENV == 'development') {
            await mongoose.connect(ATLAS_URL);
        }
    } catch (error) {
        console.log('Unable to connect to the DB server!');
        // throw new InternalServerError('Unable to connect to Database');
    }
}

module.exports = connectToDB;

