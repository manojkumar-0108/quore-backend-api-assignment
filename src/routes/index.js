const express = require('express');

const { pingCheck } = require('../controllers');
const userRouter = require('./user.routes');
const apiRouter = express.Router();

/**
 * GET Request: localhost:3000/ping
 */

apiRouter.get('/ping', pingCheck("API is live..."));

/**
 * GET Request: localhost:3000/api/
 */
apiRouter.use('/users', userRouter);

module.exports = apiRouter;