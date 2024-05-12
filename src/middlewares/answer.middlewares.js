const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");


function validatePostAnswerRequest(req, res, next) {

    if (!req.body.userId || !req.body.text) {

        let details = new Array();

        if (!req.body.text) {
            details.push("'text' text of the answer is not found in incomming request in correct form")
        }

        if (!req.body.userId) {
            details.push("'userId' userId of user posting answer is not found in incomming request in correct form")
        }

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", details);
    }

    //checking if user id is valid mongodb object id or not?

    const validUserId = mongoose.Types.ObjectId.isValid(req.body.userId);

    if (!validUserId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", [`userId:${req.body.userId} of user posting answer is not a valid mongoose object id`]);
    }


    //checking if question id is valid mongodb object id or not?

    const validQuestionId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validQuestionId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", [`question_id:${req.params.id} is not a valid mongoose object id`]);
    }
    next();
}

function validateUpdateAnswerRequest(req, res, next) {

    if (!req.body.text) {

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", [`'text' text of the answer is not found in incomming request in correct form`]);
    }

    //checking if answer id is valid mongodb object id or not?

    const validAnswerId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!validAnswerId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", [`answerId:${req.params.id} is not a valid mongoose object id`]);
    }

    next();
}

module.exports = {
    validatePostAnswerRequest,
    validateUpdateAnswerRequest
};
