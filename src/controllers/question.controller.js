const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common');

const { QuestionService } = require('../services');
const { QuestionRepository } = require('../repositories');

const questionRepository = new QuestionRepository();
const questionService = new QuestionService(questionRepository);


async function postQuestion(req, res, next) {
    try {

        const question = await questionService.createQuestion({
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