
const CrudRepository = require('./crud.repository');
const { User } = require('../models');

class UserRepository extends CrudRepository {

    constructor() {
        super(User);
    }

    async findByEmail(email) {
        //explicitly asking mongoose to add password field in result set
        const response = await this.model.findOne({ email: email }).select('+password');
        return response;
    }

}


module.exports = UserRepository;