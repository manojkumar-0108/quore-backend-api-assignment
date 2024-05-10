
const CrudRepository = require('./crud.repository');

class UserRepository extends CrudRepository {

    constructor(model) {
        super(model);
    }

    async findByEmail(email) {
        const response = await this.model.find({ email: email });
        return response;
    }

}


module.exports = UserRepository;