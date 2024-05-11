
const BaseError = require("../errors/base.error");
const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');

function errorHandler(err, req, res, next) {

    if (err instanceof BaseError) {

        Logger.error({ message: err.name, error: err.stack });

        return res
            .status(err.statusCode)
            .json({
                success: false,
                message: err.message,
                error: err.details,
                data: {}
            });
    }

    Logger.error({ message: 'Something went wrong...', error: err });
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success: false,
            message: "Something went wrong!!",
            error: err,
            data: {}
        });
}

module.exports = errorHandler;