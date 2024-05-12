const { AppError, InternalServerError, BaseError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const { TopicRepository, UserRepository } = require('../repositories');

const topicRepository = new TopicRepository();
const userRepository = new UserRepository();



class AnswerService {

    constructor(questionRepository) {
        this.questionRepository = questionRepository;
    }

    async createAnswer(questionData) {
        try {
            // 1. Check if user is present or not
            const user = await userRepository.get(questionData.userId);
            if (!user) {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Question cannot be posted", [`No user found with id: ${questionData.userId}`]);
            }

            // 2. Create new topics if not available or get existing topics' IDs
            if (questionData.topics.length > 0) {
                const topics = questionData.topics;
                const topicsId = await Promise.all(topics.map(async (topicTag) => {
                    let topic = await topicRepository.findByName(topicTag);
                    if (!topic) {
                        topic = await topicRepository.create({ name: topicTag });
                    }
                    return topic._id;
                }));
                questionData.topics = topicsId;
            }
            const question = await this.questionRepository.create(questionData);
            return question;
        } catch (error) {
            console.error(error);
            if (error instanceof BaseError) {
                throw error;
            }
            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Cannot create a question!", ['Cannot connect to database', 'Database timeout!']);
            }
            throw new InternalServerError('Cannot create a new question');
        }
    }

    async updateAnswer(id, questionData) {
        try {


            // Create new topics if not available or get existing topics' IDs
            if (questionData.topics.length > 0) {
                const topics = questionData.topics;
                const topicsId = await Promise.all(topics.map(async (topicTag) => {
                    let topic = await topicRepository.findByName(topicTag);
                    if (!topic) {
                        topic = await topicRepository.create({ name: topicTag });
                    }
                    return topic._id;
                }));
                questionData.topics = topicsId;
            }
            const question = await this.questionRepository.update({ _id: id }, questionData);
            return question;
        } catch (error) {
            console.error(error);
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'Cannot update the questions!';
                error.details = `No questions found for given id ${id}`;
                throw error;
            }


            if (error instanceof BaseError) {
                throw error;
            }
            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Cannot update the question!", ['Cannot connect to database', 'Database timeout!']);
            }
            throw new InternalServerError('Cannot update the question');
        }
    }

    async deleteAnswer(id) {
        try {
            const question = await this.questionRepository.destory(id);
            return question;
        } catch (error) {
            console.error(error);
            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'Cannot delete the questions!';
                error.details = `No questions found for given id ${id}`;
                throw error;
            }
            if (error.name == 'CastError') {
                throw new AppError(StatusCodes.BAD_REQUEST, "Cannot delete question", ['Cast to ObjectId failed', `Invalid object id received for given id: ${id}`, 'input must be a 24 character hex string, 12 byte Uint8Array, or an integer']);
            }

            if (error instanceof BaseError) {
                throw error;
            }
            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Cannot delete the question!", ['Cannot connect to database', 'Database timeout!']);
            }
            throw new InternalServerError('Cannot delete the question');
        }
    }

}

module.exports = AnswerService;