const CrudRepository = require('./crud.repository');
const { Answer } = require('../models');
const { AppError } = require('../errors');

class AnswerRepository extends CrudRepository {

    constructor() {
        super(Answer);
    }

    async getAnswersByQueId(questionId) {

        const answers = await this.model.find({ question_id: questionId })
            .sort({ created_at: -1 }) // Sort in descending order
            .populate({
                path: 'question_id',
                select: 'title body topics',
                options: {
                    as: 'question_details'
                }
            })
            .lean();

        if (answers.length === 0) {
            throw new AppError(StatusCodes.NOT_FOUND);
        }
        return answers;
    }

}


module.exports = AnswerRepository;