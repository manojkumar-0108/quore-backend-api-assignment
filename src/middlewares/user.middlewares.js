
const { StatusCodes } = require('http-status-codes');
const { AppError } = require("../errors");


const { UserService } = require('../services');
const { UserRepository } = require('../repositories');
const { User } = require('../models');
const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);


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

function validateLoginRequest(req, res, next) {

    if (!req.body.email || !req.body.password) {

        let details = new Array();

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

async function checkAuth(req, res, next) {
    try {
        const response = await userService.isAuthenticated(req.headers['x-access-token']);

        if (response) {
            req.userDetails = response;
        }

        next();
    } catch (error) {
        next(error);
    }

}

module.exports = {
    validateUserRegistration,
    validateLoginRequest,
    checkAuth
};
