const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common');

const { AnswerService } = require('../services');
const { AnswerRepository } = require('../repositories');

const answerRepository = new AnswerRepository();
const answerService = new AnswerService(answerRepository);


async function postAnswer(req, res, next) {
    try {

        const answer = await answerService.createAnswer({
            question_id: req.params.id,
            text: req.body.text,
            user_id: req.body.userId
        });

        SuccessResponse.data = answer;
        SuccessResponse.message = "Successfully posted a new answer!";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }
}

async function updateAnswer(req, res, next) {
    try {

        const answer = await answerService.updateAnswer(req.params.id, req.body);

        SuccessResponse.data = answer;
        SuccessResponse.message = "Successfully updated the answer!";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }
}

async function deleteAnswer(req, res, next) {
    try {
        const deletedAnswer = await answerService.deleteAnswer(req.params.id);

        SuccessResponse.data = deletedAnswer;
        SuccessResponse.message = "Deleted answer successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}

async function getAnswers(req, res, next) {
    try {
        const answers = await answerService.getAnswers(req.params.id);

        SuccessResponse.data = answers;
        SuccessResponse.message = "Fetched all answers successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    postAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswers
}