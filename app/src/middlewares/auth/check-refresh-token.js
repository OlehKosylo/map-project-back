const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { jwtSecrets } = require('../../config');
const { ErrorHandler, statusError } = require('../../errors');
const { responseStatusCode } = require('../../constants/enums');

module.exports = async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        return next(new ErrorHandler(
            statusError.NOT_TOKEN.message,
            statusError.NOT_TOKEN.code,
            responseStatusCode.BAD_REQUEST,
        ));
    }

    jwt.verify(token, jwtSecrets.JWT_REFRESH_SECRET, (err) => {
        if (err) {
            return next(new ErrorHandler(
                statusError.NOT_VALID_TOKEN.message,
                statusError.NOT_VALID_TOKEN.code,
                responseStatusCode.FORBIDDEN,
            ));
        }
    });

    const foundTokens = await authService.findTokenByParams({ refresh_token: token });

    if (!foundTokens) {
        return next(new ErrorHandler(
            statusError.NOT_VALID_TOKEN.message,
            statusError.NOT_VALID_TOKEN.code,
            responseStatusCode.FORBIDDEN,
        ));
    }

    req.user = foundTokens.User;

    next();
};
