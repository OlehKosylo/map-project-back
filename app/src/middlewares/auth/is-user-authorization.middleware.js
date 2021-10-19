const jwt = require('jsonwebtoken');

const { responseStatusCode, userStatus } = require('../../constants/enums');
const { ErrorHandler, statusError } = require('../../errors');
const { authService } = require('../../services');
const { jwtSecrets } = require('../../config');

module.exports = async (req, res, next) => {
    try {
        const token = req.get('Authorization');

        if (token) {
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

            if (User.user_status === userStatus.BLOCKED) {
                return next(new ErrorHandler(
                    statusError.USER_IS_BLOCKED.message,
                    statusError.USER_IS_BLOCKED.code,
                    responseStatusCode.FORBIDDEN
                ));
            }

            req.user = User;
        }

        next();
    } catch (e) {
        next(e);
    }
};
