const express = require('express');
const { pingCheck } = require('../controllers');

const userRouter = require('./user.routes');
const topicRouter = require('./topic.routes');
const questionRouter = require('./question.routes');


const apiRouter = express.Router();

/**
 * API End point
 * GET Request: localhost:3000/api/
 */

apiRouter.get('/ping', pingCheck("API is live..."));

apiRouter.use('/users', userRouter);

apiRouter.use('/topics', topicRouter);

apiRouter.use('/questions', questionRouter);

module.exports = apiRouter;