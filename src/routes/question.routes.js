const express = require('express');

const { pingCheck, questionController } = require('../controllers');
const { questionMiddlewares } = require('../middlewares');

const questionRouter = express.Router();

/**
 * API End point
 * GET Request: localhost:3000/api/questions
 */

questionRouter.get('/ping', pingCheck("Question API is live.."));

questionRouter.post(
    '/',
    questionMiddlewares.validatePostQuestionRequest,
    questionController.postQuestion
);

questionRouter.put(
    '/:id',
    questionMiddlewares.validateUpdateQuestionRequest,
    questionController.updateQuestions
);

questionRouter.get('/', questionController.searchQuestions);


module.exports = questionRouter;