const { PlaceModel, UserModel } = require('../../data-base/models');

module.exports = {
    createPlace: (place) => PlaceModel.create(place),

    getPlaceById: (id) => PlaceModel.findOne({
        where: { id },
        include: {
            model: UserModel
        }
    }),

    getPlacesByParams: (params) => PlaceModel.findAll({
        where: params,
        include: {
            model: UserModel
        }
    }),

    deleteById: (id) => PlaceModel.destroy({
        where: {
            id
        }
    })
};
