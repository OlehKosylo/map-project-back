const { enum: { userRole: { ADMIN, SUPPORT }, responseStatusCode } } = require('../../constants');
const { ErrorHandler, statusError } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const { user } = req;

        if (user.user_role !== ADMIN && user.user_role !== SUPPORT) {
            return next(new ErrorHandler(
                statusError.FORBIDDEN_NO_PERMISSIONS.message,
                statusError.FORBIDDEN_NO_PERMISSIONS.code,
                responseStatusCode.FORBIDDEN,
            ));
        }

        next();
    } catch (e) {
        next(e);
    }
};
