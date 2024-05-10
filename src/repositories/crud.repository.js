class CrudRepository {

    constructor(model) {
        this.model = model;
    }

    async create(problemData) {
        const response = await this.model.create(problemData);
        return response;
    }

    async get(id) {
        const response = await this.model.findById(id);
        if (!response) {
            throw new AppError(StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll() {
        const response = await this.model.find({});
        if (!response) {
            throw new AppError(StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async destory(id) {
        const response = await Problem.findByIdAndDelete(id);
        if (!response) {
            throw new AppError(StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async update(query, problemData) {
        const response = await this.model.findOneAndUpdate(query, problemData);
        if (!response) {
            throw new AppError(StatusCodes.NOT_FOUND);
        }
        return response;
    }
}

module.exports = CrudRepository;