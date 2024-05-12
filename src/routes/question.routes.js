const express = require('express');

const { pingCheck, questionController, answerController } = require('../controllers');
const { questionMiddlewares, answerMiddlewares } = require('../middlewares');

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

questionRouter.delete('/:id', questionController.deleteQuestion);

questionRouter.post(
    '/:id/answers',
    answerMiddlewares.validatePostAnswerRequest,
    answerController.postAnswer
);

questionRouter.get(
    '/:id/answers',
    answerController.getAnswers
);


module.exports = questionRouter;