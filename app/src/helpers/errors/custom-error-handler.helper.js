const { responseStatusCode } = require('../../constants/enums');

module.exports = function customErrorHandler(err, req, res) {
    res
        .status(err.status || responseStatusCode.SERVER_ERROR)
        .json({
            error: {
                message: err.message || 'Unknown Error',
                code: err.code,
                data: err.data
            }
        });
};
