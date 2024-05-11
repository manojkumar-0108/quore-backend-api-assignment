const { AppError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const CrudRepository = require('./crud.repository');
const { Question } = require('../models');

class QuestionRepository extends CrudRepository {

    constructor() {
        super(Question);
    }

    async searchQuestions(question, topicNames) {

        const titleRegex = new RegExp(question, "i");

        const questions = await this.model.find({ title: titleRegex })
            .sort({ createdAt: -1 }) //sort in descending order
            .populate({
                path: 'topics',
                select: 'name -_id'
            })
            .lean();


        if (questions.length === 0) {
            throw new AppError(StatusCodes.NOT_FOUND);
        }

        const response = questions.filter((question) => {
            let topicMatched = (topicNames.length > 0) ? false : true;

            const topics = question.topics.map((obj) => {

                if (topicNames.length > 0 && !topicMatched) {
                    for (let i = 0; i < topicNames.length; i++) {
                        if (topicNames[i].toUpperCase() === obj.name.toUpperCase()) {
                            topicMatched = true;
                            break;
                        }
                    }
                }
                return obj.name
            });
            question.topics = topics;
            return topicMatched;
        });

        if (response.length === 0) {
            throw new AppError(StatusCodes.NOT_FOUND);
        }

        return response;
    }


}


module.exports = QuestionRepository;