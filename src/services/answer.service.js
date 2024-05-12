const { AppError, InternalServerError, BaseError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const { UserRepository } = require('../repositories');
const userRepository = new UserRepository();

class AnswerService {

    constructor(answerRepository) {
        this.answerRepository = answerRepository;
    }

    async createAnswer(answerData) {
        try {
            // 1. Check if user is present or not
            const user = await userRepository.get(answerData.user_id);
            if (!user) {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Answer cannot be posted", [`No user found with id: ${answerData.user_id}`]);
            }

            const answer = await this.answerRepository.create(answerData);
            return answer;
        } catch (error) {
            console.error(error);
            if (error instanceof BaseError) {
                throw error;
            }
            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Cannot create an answer!", ['Cannot connect to database', 'Database timeout!']);
            }
            throw new InternalServerError('Cannot create a new answer');
        }
    }

    async updateAnswer(id, answerData) {
        try {

            const answer = await this.answerRepository.update({ _id: id }, answerData);
            return answer;
        } catch (error) {
            console.error(error);
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'Cannot update the answer!';
                error.details = `No answer found for given id ${id}`;
                throw error;
            }


            if (error instanceof BaseError) {
                throw error;
            }
            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Cannot update the answer!", ['Cannot connect to database', 'Database timeout!']);
            }
            throw new InternalServerError('Cannot update the answer');
        }
    }

    async deleteAnswer(id) {
        try {
            const deletedAnswer = await this.answerRepository.destory(id);
            return deletedAnswer;
        } catch (error) {
            console.error(error);
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'Cannot delete the answer!';
                error.details = `No answer found for given id ${id}`;
                throw error;
            }
            if (error.name == 'CastError') {
                throw new AppError(StatusCodes.BAD_REQUEST, "Cannot delete the answer", ['Cast to ObjectId failed', `Invalid object id received for given id: ${id}`, 'input must be a 24 character hex string, 12 byte Uint8Array, or an integer']);
            }

            if (error instanceof BaseError) {
                throw error;
            }
            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Cannot delete the answer!", ['Cannot connect to database', 'Database timeout!']);
            }
            throw new InternalServerError('Cannot delete the answer');
        }
    }

}

module.exports = AnswerService;