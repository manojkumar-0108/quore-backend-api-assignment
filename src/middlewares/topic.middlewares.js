
const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");



function validatePostTopicRequest(req, res, next) {

    if (!req.body.name) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", `'name' topic name is not found in incomming request in correct form`);
    }
    next();
}

module.exports = {
    validatePostTopicRequest
};
