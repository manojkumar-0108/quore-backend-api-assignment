const express = require('express');

const { pingCheck, answerController } = require('../controllers');
const { answerMiddlewares } = require('../middlewares');

const answerRouter = express.Router();

/**
 * API End point
 * GET Request: localhost:3000/api/answers
 */

answerRouter.get('/ping', pingCheck("Answer API is live.."));

answerRouter.put(
    '/:id',
    answerMiddlewares.validateUpdateAnswerRequest,
    answerController.updateAnswer
);

answerRouter.delete(
    '/:id',
    answerController.deleteAnswer
);


module.exports = answerRouter;