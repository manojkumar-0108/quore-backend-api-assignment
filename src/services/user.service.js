const { AppError, InternalServerError, BaseError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }


    async registerUser(userData) {

        try {
            /**
             * 1. Check if user account is already created ? and throw error
             * 2. Create user
             */

            const findUser = await this.userRepository.findByEmail(userData.email);

            if (findUser.length > 0) {
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

            console.log(error);

            if (error instanceof BaseError) {
                throw error;
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Database Connection error", ['Cannot connect to database']);
            }
            throw new InternalServerError('Cannot register a user');
        }
    }
}

module.exports = UserService;