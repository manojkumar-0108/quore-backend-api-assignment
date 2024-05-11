const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");


function validatePostQuestionRequest(req, res, next) {

    if (!req.body.title || !req.body.body || !req.body.userId) {

        let details = new Array();

        if (!req.body.title) {
            details.push("'title' title of the question is not found in incomming request in correct form")
        }

        if (!req.body.body) {
            details.push("'body' question body is not found in incomming request in correct form")
        }

        if (!req.body.userId) {
            details.push("'userId' userId of user posting question is not found in incomming request in correct form")
        }

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", details);
    }

    //checking if user id is valid mongodb object id or not?

    const isValidId = mongoose.Types.ObjectId.isValid(req.body.userId);

    if (!isValidId) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", [`userId:${req.body.userId} of user posting question is not a valid mongoose object id`]);
    }

    if (req.body.topics) {
        const topics = req.body.topics.split(',');
        req.body.topics = topics;
    }

    next();
}



module.exports = {
    validatePostQuestionRequest
};
