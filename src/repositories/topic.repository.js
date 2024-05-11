
const CrudRepository = require('./crud.repository');

class TopicRepository extends CrudRepository {

    constructor(model) {
        super(model);
    }

    async findByName(topicName) {
        const response = await this.model.findOne({ name: topicName });
        return response;
    }

}


module.exports = TopicRepository;