const Sequelize = require('sequelize');

const { enum: { responseStatusCode } } = require('../../constants');
const { ErrorHandler, statusError } = require('../../errors');
const { usersService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email, phone } = req.body;

        const foundUser = await usersService.getUserByParams({
            [Sequelize.Op.or]: [{ email }, { phone }]
        });

        if (foundUser) {
            return next(new ErrorHandler(
                statusError.USER_ALREADY_EXIST.message,
                statusError.USER_ALREADY_EXIST.code,
                responseStatusCode.BAD_REQUEST,
            ));
        }

        next();
    } catch (e) {
        next(e);
    }
};
