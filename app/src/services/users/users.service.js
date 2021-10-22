const { UserModel } = require('../../data-base/models');
const { apiLogger } = require('../../logger/logger');

module.exports = {
    createUser: (user) => {
        try {
            return UserModel.create(user);
        } catch (e) {
            apiLogger.error('Error when user try to register', e);
            throw e;
        }
    },

    getUserById: (id) => UserModel.findOne({
        where: { id },
    }),

    getUserByParams: (params, attributes) => {
        let options = {
            where: params,
            attributes
        };

        return UserModel.findOne(options);
    },

    getUsersByParams: (limit, offset, params, attributes) => UserModel.findAndCountAll({
        where: params,
        limit,
        offset,
        attributes
    }),

    updateUserByParams: (params, option) => UserModel.update(option, {
        where: params,
    }),

    count: () => UserModel.count(),

};
