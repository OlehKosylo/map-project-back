const { authHelper, paginationHelpers: { getOffset, countPage } } = require('../../helpers');
const { responseStatusCode } = require('../../constants/enums');
const { ErrorHandler, statusError } = require('../../errors');
const { usersService } = require('../../services');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const { page, limit = 30, ...query } = req.query;
            const offset = getOffset(page, limit);

            const { rows, count } = await usersService.getUsersByParams(
                limit,
                offset,
                query
            );

            res.json({
                data: rows,
                page: +page,
                total: count,
                limit: +limit,
                pages: countPage(count, limit),
            });
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await usersService.getUserById(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getUser: async (req, res, next) => {
        try {
            const { user } = req;

            const places = await user.getPlaces();

            let i = 0;
            for await (const place of places) {
                places[i].dataValues.scores = await place.getRatings();
                i += 1;
            }

            res.json({ user, places });
        } catch (e) {
            next(e);
        }
    },

    createPlacesUser: async (req, res, next) => {
        try {
            const { user, body } = req;

            await user.addPlaces(body);

            res.json({ user });
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { id } = req.user;

            await usersService.updateUserByParams({ id }, req.body);

            res.json(responseStatusCode.OK);
        } catch (e) {
            next(e);
        }
    },

    updatePassword: async (req, res, next) => {
        try {
            const payload = req.body;
            const { password, id } = req.user;

            const status = await authHelper.checkHash(password, payload.oldPassword);

            if (!status) {
                return next(new ErrorHandler(
                    statusError.BAD_REQUEST.message,
                    statusError.BAD_REQUEST.code,
                    responseStatusCode.BAD_REQUEST,
                ));
            }
            const hashedNewPassword = await authHelper.hashPassword(payload.password);

            await usersService.updateUserByParams({ id }, {
                password: hashedNewPassword
            });

            res.json(responseStatusCode.OK);
        } catch (e) {
            next(e);
        }
    }
};
