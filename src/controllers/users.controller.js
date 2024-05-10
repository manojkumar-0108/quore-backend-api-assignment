
const { NotImplementedError } = require('../errors');

function login(req, res, next) {

    try {
        throw new NotImplementedError('login');
    } catch (error) {
        next(error);
    }
}


function registerUser(req, res, next) {
    try {
        throw new NotImplementedError('registerUser');
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