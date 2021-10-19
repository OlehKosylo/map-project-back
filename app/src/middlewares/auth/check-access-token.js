const jwt = require('jsonwebtoken');

const { responseStatusCode } = require('../../constants/enums');
const { ErrorHandler, statusError } = require('../../errors');
const { authService } = require('../../services');
const { jwtSecrets } = require('../../config');

module.exports = async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (!token) {
            return next(new ErrorHandler(
                statusError.NOT_TOKEN.message,
                statusError.NOT_TOKEN.code,
                responseStatusCode.NOT_FOUND
            ));
        }

        jwt.verify(token, jwtSecrets.JWT_SECRET, (err) => {
            if (err) {
                return next(new ErrorHandler(
                    statusError.NOT_VALID_TOKEN.message,
                    statusError.NOT_VALID_TOKEN.code,
                    responseStatusCode.BAD_REQUEST
                ));
            }
        });

        const foundTokens = await authService.findTokenByParams({ access_token: token });

        if (!foundTokens) {
            return next(new ErrorHandler(
                statusError.NOT_TOKEN.message,
                statusError.NOT_TOKEN.code,
                responseStatusCode.NOT_FOUND
            ));
        }

        const { User } = foundTokens;

        if (!User) {
            return next(new ErrorHandler(
                statusError.USER_NOT_FOUND.message,
                statusError.USER_NOT_FOUND.code,
                responseStatusCode.NOT_FOUND
            ));
        }

        req.user = User;

        next();
    } catch (e) {
        next(e);
    }
};
