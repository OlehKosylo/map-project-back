const { JWTTokenModel, UserModel } = require('../../data-base/models');

module.exports = {
    createTokens: (data) => JWTTokenModel.create(data),

    deleteTokens: (params) => JWTTokenModel.destroy({
        where: params
    }),

    findTokenByParams: (params) => JWTTokenModel.findOne({
        where: params,
        include: [{
            model: UserModel
        }]
    }),
};
