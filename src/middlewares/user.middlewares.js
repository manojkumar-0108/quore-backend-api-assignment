
const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");


function validateUserRegistration(req, res, next) {

    if (!req.body.username || !req.body.email || !req.body.password) {

        let details = new Array();

        if (!req.body.username) {
            details.push("username is not found in incomming request in correct form")
        }

        if (!req.body.email) {
            details.push("email is not found in incomming request in correct form")
        }

        if (!req.body.password) {
            details.push("password is not found in incomming request in correct form")
        }

        throw new AppError(StatusCodes.BAD_REQUEST, "Please enter valid details", details);
    }

    next();
}


module.exports = {
    validateUserRegistration
};
