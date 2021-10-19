const { responseStatusCode } = require('../../constants/enums');

module.exports = function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res
            .status(responseStatusCode.SERVER_ERROR)
            .send({
                error: {
                    message: 'Request dependent error!',
                    code: err.code,
                    data: err.data
                }
            });
    } else {
        next(err);
    }
};
