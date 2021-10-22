const { Router } = require('express');

const { placesController } = require('../../controllers');
const { authMiddlewares: { checkAccessToken } } = require('../../middlewares');

const placesRouter = Router();

placesRouter.use(checkAccessToken);

placesRouter.post('/', placesController.createPlace);
placesRouter.get('/', placesController.getAllPlaces);
placesRouter.get('/:id', placesController.getPlaceById);
placesRouter.delete('/:id', placesController.deletePlace);

module.exports = placesRouter;
