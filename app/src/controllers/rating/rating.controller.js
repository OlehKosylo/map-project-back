const { ratingService } = require('../../services');
const { countRating } = require('../../helpers');

module.exports = {
    createRating: async (req, res, next) => {
        try {
            const { user, body } = req;

            await ratingService.createRating({
                place_id: body.place_id,
                user_id: user.id,
                score: body.score
            });

            const markedRating = await ratingService.getRatingByParams({
                place_id: body.place_id
            });

            const newScore = countRating(
                markedRating.map((el) => el.score)
            );

            res.json(newScore);
        } catch (e) {
            next(e);
        }
    },

    deleteRating: async (req, res, next) => {
        try {
            const { user } = req;
            const { id } = req.params;

            await ratingService.deleteById(id, user.id);

            const markedRating = await ratingService.getRatingByParams({
                place_id: id
            });

            const newScore = countRating(
                markedRating.map((el) => el.score)
            );

            res.json(newScore);
        } catch (e) {
            next(e);
        }
    }
};
