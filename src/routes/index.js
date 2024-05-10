const express = require('express');

const { pingCheck } = require('../controllers');
const userRouter = require('./user.routes');
const apiRouter = express.Router();

/**
 * API End point
 * GET Request: localhost:3000/api/
 */

apiRouter.get('/ping', pingCheck("API is live..."));

apiRouter.use('/users', userRouter);

module.exports = apiRouter;