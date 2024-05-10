
const CrudRepository = require('./crud.repository');

class UserRepository extends CrudRepository {

    constructor(model) {
        super(model);
    }

    async findByEmail(email) {
        //explicitly asking mongoose to add password field in result set
        const response = await this.model.findOne({ email: email }).select('+password');
        return response;
    }

}


module.exports = UserRepository;