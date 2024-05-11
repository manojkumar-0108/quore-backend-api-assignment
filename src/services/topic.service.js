const { AppError, InternalServerError, BaseError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

class TopicService {

    constructor(topicRepository) {
        this.topicRepository = topicRepository;
    }


    async createTopic(topicData) {

        try {
            // 1. Check if topic name is already available or not?
            const findTopic = await this.topicRepository.findByName(topicData.name);

            if (findTopic) {
                throw new AppError(
                    StatusCodes.BAD_REQUEST, "Topic already available",
                    [
                        `The request to create a new topic with name : ${topicData.name} is already present!`,
                        'Try again with another topic name'
                    ]
                );
            }
            const topic = await this.topicRepository.create(topicData);
            return topic;
        } catch (error) {

            if (error instanceof BaseError) {
                throw error;
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Topic creation failed!", ['Cannot connect to database', 'Database timeout!']);
            }
            throw new InternalServerError('Cannot create a new topic');
        }
    }

    async getAllTopics() {

        try {
            const topics = await this.topicRepository.getAll();
            return topics;
        } catch (error) {

            if (error.statusCode == StatusCodes.NOT_FOUND) {
                error.message = 'No topics found!';
                error.details = `No topics available, please start by adding one`;
                throw error;
            }

            if (error.name == 'MongooseError') {
                throw new AppError(StatusCodes.SERVICE_UNAVAILABLE, "Unable to fetch topics", ['Cannot connect to database', 'Database timeout!']);
            }

            throw new InternalServerError('Unable to fetch topics');
        }
    }

}

module.exports = TopicService;