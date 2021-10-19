const Sequelize = require('sequelize');

const { Op } = Sequelize;

const { paginationHelpers: { getOffset, countPage }, authHelper } = require('../../helpers');
const { responseStatusCode } = require('../../constants/enums');
const { usersService } = require('../../services');

module.exports = {
    getUsers: async (req, res, next) => {
        try {
            const { page, limit = 30, id, display_name } = req.query;
            const offset = getOffset(page, limit);

            const params = {};

            if (id) params.id = id;

            if (display_name) params.display_name = { [Op.like]: `%${display_name}%` };

            const { rows, count } = await usersService.getUsersByParams(
                limit,
                offset,
                params
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

    editUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            if (req.body.data.password) {
                req.body.data.password = await authHelper.hashPassword(req.body.data.password);
            }

            await usersService.updateUserByParams({ id: user_id }, req.body.data);

            res.json(responseStatusCode.OK);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await usersService.getUserById(user_id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
