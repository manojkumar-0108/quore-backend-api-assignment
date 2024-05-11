const { StatusCodes } = require('http-status-codes');
const { SuccessResponse } = require('../utils/common');

const { TopicService } = require('../services');
const { TopicRepository } = require('../repositories');

const topicRepository = new TopicRepository();
const topicService = new TopicService(topicRepository);



async function postTopic(req, res, next) {
    try {

        const topic = await topicService.createTopic({
            name: req.body.name
        });

        SuccessResponse.data = topic;
        SuccessResponse.message = "Successfully created a new topic";
        SuccessResponse.statusCode = StatusCodes.CREATED;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);

    } catch (error) {
        next(error);
    }
}

async function getTopics(req, res, next) {
    try {
        const topics = await topicService.getAllTopics();

        SuccessResponse.data = topics;
        SuccessResponse.message = "Fetched all topics successfully";
        SuccessResponse.statusCode = StatusCodes.OK;

        return res
            .status(SuccessResponse.statusCode)
            .json(SuccessResponse);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    postTopic,
    getTopics
}