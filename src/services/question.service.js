const { AppError, InternalServerError, BaseError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const { TopicRepository, UserRepository } = require('../repositories');

const topicRepository = new TopicRepository();
const userRepository = new UserRepository();

class QuestionService {

    constructor(questionRepository) {
        this.questionRepository = questionRepository;
    }

    async createQuestion(questionData) {
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


    async getAllQuestions(query) {

        try {
            console.log(query);

            const questions = await this.questionRepository.getAll();
            return questions;
        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'No questions found!';
                error.details = `No questions available, please start by adding one`;
                throw error;
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Unable to fetch questions", ['Cannot connect to database', 'Database timeout!']);
            }

            throw new InternalServerError('Unable to fetch questions');
        }
    }

}

module.exports = QuestionService;