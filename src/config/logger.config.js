const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ timestamp, level, message, error }) => {
    return `\n ${timestamp} : ${level} : ${message} \n [ ${error} ]`;
});

const logger = createLogger({
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "combined.log" })
    ]
});

module.exports = logger;