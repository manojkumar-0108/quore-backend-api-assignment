const express = require('express');

const { pingCheck } = require('../controllers');

const userRouter = express.Router();


/**
 * GET Request: localhost:3000/api/users/ping
 */

userRouter.get('/ping', pingCheck("User API is live.."));

/**
 * GET Request: localhost:3000/api/
 */

module.exports = userRouter;