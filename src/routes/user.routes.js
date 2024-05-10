const express = require('express');

const { pingCheck, userController } = require('../controllers');
const { userMiddlewares } = require('../middlewares');

const userRouter = express.Router();

/**
 * API End point
 * GET Request: localhost:3000/api/users
 */

userRouter.get('/ping', pingCheck("User API is live.."));

userRouter.post('/login', userController.login);

userRouter.post('/',
    userMiddlewares.validateUserRegistration,
    userController.registerUser
);

userRouter.put('/', userController.updateUserDetails);

userRouter.get('/:id', userController.getUserDetails);

userRouter.delete('/:id', userController.deleteUser);


module.exports = userRouter;