const Sequelize = require('sequelize');

const { responseStatusCode } = require('../../constants/enums');
const { usersService, authService } = require('../../services');
const { ErrorHandler, statusError } = require('../../errors');
const { authHelper } = require('../../helpers');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            const userPayload = req.body;

            userPayload.password = await authHelper.hashPassword(userPayload.password);

            await usersService.createUser(userPayload);

            res.json(responseStatusCode.OK);
        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {
        try {
            const { password, email = '' } = req.body;

            const foundUser = await usersService.getUserByParams({
                [Sequelize.Op.or]: [{ email }]
            });

            if (!foundUser) {
                return next(new ErrorHandler(
                    statusError.USER_NOT_FOUND.message,
                    statusError.USER_NOT_FOUND.code,
                    responseStatusCode.BAD_REQUEST,
                ));
            }

            const status = await authHelper.checkHash(foundUser.password, password);

            if (!status) {
                return next(new ErrorHandler(
                    statusError.BAD_REQUEST.message,
                    statusError.BAD_REQUEST.code,
                    responseStatusCode.BAD_REQUEST,
                ));
            }

            const tokens = authHelper.jwtTokinazer();
            await authService.deleteTokens({ user_id: foundUser.id });
            await authService.createTokens({ ...tokens, user_id: foundUser.id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                return next(new ErrorHandler(
                    statusError.NOT_TOKEN.message,
                    statusError.NOT_TOKEN.code,
                    responseStatusCode.BAD_REQUEST,
                ));
            }

            await authService.deleteTokens({ access_token });

            res.json(responseStatusCode.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { user } = req;
            const refresh_token = req.get('Authorization');

            await authService.deleteTokens({ refresh_token });

            const tokens = authHelper.jwtTokinazer();
            await authService.createTokens({ ...tokens, user_id: user.id });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
