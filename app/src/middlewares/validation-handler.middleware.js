const { isEqual } = require('lodash');

const { enum: { validationTypes, responseStatusCode } } = require('../constants');
const { ErrorHandler, statusError } = require('../errors');

module.exports = (schema, payloadCase, type) => (req, res, next) => {
    try {
        let data = req.body;

        switch (type) {
            case validationTypes.toQuery:
                data = req.query;
                break;
            case validationTypes.toParams:
                data = req.params;
                break;
        }

        const validatorOptions = isEqual(payloadCase, validationTypes.payloadCase)
            ? { abortEarly: false, convert: false }
            : { abortEarly: false };

        const { error } = schema.validate(data, validatorOptions);

        if (error) {
            return next(new ErrorHandler(
                error.message,
                statusError.BAD_REQUEST.code,
                responseStatusCode.BAD_REQUEST
            ));
        }

        next();
    } catch (e) {
        next(e);
    }
};
