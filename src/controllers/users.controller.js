const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common/');
const { NotImplementedError } = require('../errors');

const { UserService } = require('../services');
const { UserRepository } = require('../repositories');
const { User } = require('../models');

const userRepository = new UserRepository(User);
const userService = new UserService(userRepository);

function login(req, res, next) {

    try {
        throw new NotImplementedError('login');
    } catch (error) {
        next(error);
    }
}


async function registerUser(req, res, next) {
    try {

        const user = await userService.registerUser({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            bio: (req.body.bio) ? req.body.bio : ''
        });


        SuccessResponse.data = user;
        SuccessResponse.message = "Successfully registered user";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);


    } catch (error) {
        next(error);
    }
}

function getUserDetails(req, res, next) {
    try {
        throw new NotImplementedError('getUserDetails');
    } catch (error) {
        next(error);
    }
}



function updateUserDetails(req, res, next) {
    try {
        throw new NotImplementedError('updateUserDetails');
    } catch (error) {
        next(error);
    }
}


function deleteUser(req, res, next) {
    try {
        throw new NotImplementedError('deleteUser');
    } catch (error) {
        next(error);
    }
}


module.exports = {
    login,
    registerUser,
    getUserDetails,
    deleteUser,
    updateUserDetails
}