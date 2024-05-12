const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common');

const { AnswerService } = require('../services');
const { AnswerRepository } = require('../repositories');

const answerRepository = new AnswerRepository();
const answerService = new AnswerService(answerRepository);


async function postAnswer(req, res, next) {
    try {

        const question = await answerService.createAnswer({
            title: req.body.title,
            body: req.body.body,
            topics: req.body.topics || [],
            userId: req.body.userId
        });

        SuccessResponse.data = question;
        SuccessResponse.message = "Successfully created a new questions";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }
}

async function searchQuestions(req, res, next) {
    try {
        const questions = await questionService.getAllQuestions(req.query);

        SuccessResponse.data = questions;
        SuccessResponse.message = "Fetched all questions successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}

async function updateQuestions(req, res, next) {
    try {

        const question = await questionService.updateQuestion(req.params.id, req.body);

        SuccessResponse.data = question;
        SuccessResponse.message = "Successfully updated question";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }
}

async function deleteQuestion(req, res, next) {
    try {
        const question = await questionService.deleteQuestion(req.params.id);

        SuccessResponse.data = question;
        SuccessResponse.message = "Deleted question successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    postQuestion,
    searchQuestions,
    updateQuestions,
    deleteQuestion
}