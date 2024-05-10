const { AppError, InternalServerError, BaseError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const { Auth } = require('../utils/common');

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async loginUser(userData) {

        try {
            /**
             * 1. Find User
             * 2. Match Password
             * 3. Generate jwt token
             * 4. return jwt token
             */

            const findUser = await this.userRepository.findByEmail(userData.email);

            if (!findUser) {
                throw new AppError(
                    StatusCodes.BAD_REQUEST, "Login Failed!",
                    [
                        `The account requested to login with email : ${userData.email} is not present!`,
                        'Enter correct email'
                    ]
                );
            }

            //matching password
            const matchPassword = Auth.checkPassword(userData.password, findUser.password);
            if (!matchPassword) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Login Failed', ['Incorrect Password']);
            }
            const jwt = Auth.generateToken({ id: findUser._id });
            return jwt;
        } catch (error) {
            console.log(error);

            if (error instanceof BaseError) {
                throw error;
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Login failed!", ['Cannot connect to database', 'Database timeout!']);
            }
            throw new InternalServerError('Cannot register a new user');
        }
    }

    async registerUser(userData) {

        try {
            /**
             * 1. Check if user account is already created ? and throw error
             * 2. Create user
             */

            const findUser = await this.userRepository.findByEmail(userData.email);

            if (findUser) {
                throw new AppError(
                    StatusCodes.BAD_REQUEST, "Account already created",
                    [
                        `The request to create a new account with email : ${userData.email} is already created!`,
                        'Try to forget password or enter another email'
                    ]
                );
            }
            const user = await this.userRepository.create(userData);
            return user;
        } catch (error) {

            if (error instanceof BaseError) {
                throw error;
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Database Connection error", ['Cannot connect to database']);
            }
            throw new InternalServerError('Cannot register a new user');
        }
    }

    async getUserDetails(id) {

        try {
            const user = await this.userRepository.get(id);
            return user;
        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'User not found!';
                error.details = `User account requested for id: ${id} is not present`;
                throw error;
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Database Connection error", ['Cannot connect to database']);
            }

            if (error.name == 'CastError') {
                throw new AppError(StatusCodes.BAD_REQUEST, "Cast to ObjectId failed", [`Invalid object id received for given id: ${id}`, 'input must be a 24 character hex string, 12 byte Uint8Array, or an integer']);
            }

            throw new InternalServerError('Cannot get user details');
        }
    }

    async updateUserDetails(id, userData) {

        try {


            if (userData.email) {
                throw new AppError(StatusCodes.FORBIDDEN, 'Cannot update email address', 'Modification of email is not allowed.');
            }

            const query = { _id: id }
            const user = await this.userRepository.update(query, userData);
            console.log(user);
            return user;
        } catch (error) {

            console.log(error);
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'User not found!';
                error.details = `User account requested for id: ${id} is not present`;
                throw error;
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Cannot update user details", ['Cannot connect to database', 'Database timeout!']);
            }

            if (error.name == 'CastError') {
                throw new AppError(StatusCodes.BAD_REQUEST, "Cannot update user details", ['Cast to ObjectId failed', `Invalid object id received for given id: ${id}`, 'input must be a 24 character hex string, 12 byte Uint8Array, or an integer']);
            }

            if (error instanceof BaseError) {
                throw error;
            }
            throw new InternalServerError('Cannot update user details');
        }
    }

    async isAuthenticated(token) {

        try {

            if (!token) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['Missing JWT token']);
            }

            const response = Auth.verifyToken(token);

            const user = await this.userRepository.get(response.id);

            if (!user) {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['No user found']);
            }

            return user;

        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            if (error.name == 'JsonWebTokenError') {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['Invalid JWT token']);
            }

            if (error.name == 'TokenExpiredError') {
                throw new AppError(StatusCodes.BAD_REQUEST, 'Authentication Failed', ['JWT token expired']);
            }

            throw new InternalServerError("Authentication failed");
        }
    }


}

module.exports = UserService;