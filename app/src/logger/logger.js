const { createLogger, transports, format } = require('winston');
const path = require('path');

const apiPath = path.resolve('../../logs/api/logs.log');

const transporter = (pathToFile) => ({
    transports: [new transports.File({
        filename: pathToFile,
        level: 'error',
        format: format.combine(format.timestamp(), format.json())
    })]
});

const apiLogger = createLogger(transporter(apiPath));

module.exports = { apiLogger };
