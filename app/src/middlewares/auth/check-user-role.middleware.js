const { enum: { userRole: { ADMIN }, responseStatusCode } } = require('../../constants');
const { ErrorHandler, statusError } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const { user } = req;

        if (user.user_role !== ADMIN) {
            return next(new ErrorHandler(
                statusError.FORBIDDEN_NO_PERMISSIONS.message,
                statusError.FORBIDDEN_NO_PERMISSIONS.code,
                responseStatusCode.FORBIDDEN,
            ));
        }

        req.adminRoute = true;

        next();
    } catch (e) {
        next(e);
    }
};
