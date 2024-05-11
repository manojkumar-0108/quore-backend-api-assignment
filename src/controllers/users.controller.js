const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common/');
const { NotImplementedError } = require('../errors');

const { UserService } = require('../services');
const { UserRepository } = require('../repositories');

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

async function login(req, res, next) {

    try {

        const response = await userService.loginUser({
            email: req.body.email,
            password: req.body.password
        });


        SuccessResponse.data = response;
        SuccessResponse.message = "Successfully signed in";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
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

async function getUserDetails(req, res, next) {
    try {
        const user = await userService.getUserDetails(req.params.id);

        SuccessResponse.data = user;
        SuccessResponse.message = "Fetched user details successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}

async function updateUserDetails(req, res, next) {
    try {
        console.log('update user details: ', req.body);

        const user = await userService.updateUserDetails(req.params.id, req.body);

        SuccessResponse.data = user;
        SuccessResponse.message = "Successfully updated user details";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
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