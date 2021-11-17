const { RatingModel } = require('../../data-base/models');

module.exports = {
    createRating: (el) => RatingModel.create(el),

    updateRating: (id, score) => RatingModel.update({ score }, { id }),

    getRatingByParams: (params) => RatingModel.findAll({
        where: params
    }),

    deleteById: (place_id, user_id) => RatingModel.destroy({
        where: {
            place_id,
            user_id
        }
    })
};
