const express = require('express');

const { pingCheck, topicController } = require('../controllers');
const { topicMiddlewares } = require('../middlewares');

const topicRouter = express.Router();

/**
 * API End point
 * GET Request: localhost:3000/api/topics
 */

topicRouter.get('/ping', pingCheck("Topics API is live.."));

topicRouter.post(
    '/',
    topicMiddlewares.validatePostTopicRequest,
    topicController.postTopic
);

topicRouter.get('/', topicController.getTopics);


module.exports = topicRouter;