const CrudRepository = require('./crud.repository');
const { Answer } = require('../models');

class AnswerRepository extends CrudRepository {

    constructor() {
        super(Answer);
    }

}


module.exports = AnswerRepository;