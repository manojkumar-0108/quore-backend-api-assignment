
const CrudRepository = require('./crud.repository');
const { Topic } = require('../models');

class TopicRepository extends CrudRepository {

    constructor() {
        super(Topic);
    }

    async findByName(topicName) {
        const response = await this.model.findOne({ name: { $regex: new RegExp(topicName, 'i') } });

        return response;
    }

}


module.exports = TopicRepository;