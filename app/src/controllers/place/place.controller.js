const { responseStatusCode } = require('../../constants/enums');
const { placeService } = require('../../services');

module.exports = {
    getAllPlaces: async (req, res, next) => {
        try {
            const places = await placeService.getPlacesByParams(req.query);

            res.json(places);
        } catch (e) {
            next(e);
        }
    },

    getPlaceById: async (req, res, next) => {
        try {
            const { id } = req.params;

            const place = await placeService.getPlaceById(id);

            res.json(place);
        } catch (e) {
            next(e);
        }
    },

    deletePlace: async (req, res, next) => {
        try {
            const { id } = req.params;

            await placeService.deleteById(id);

            res.json(responseStatusCode.NO_CONTENT);
        } catch (e) {
            next(e);
        }
    },

    createPlace: async (req, res, next) => {
        try {
            const data = req.body;

            const createdPlace = await placeService.createPlace(data);

            res.json(createdPlace);
        } catch (e) {
            next(e);
        }
    }
};
