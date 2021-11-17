const { Router } = require('express');

const { ratingController } = require('../../controllers');
const { authMiddlewares: { checkAccessToken } } = require('../../middlewares');

const ratingRouter = Router();

ratingRouter.use(checkAccessToken);

ratingRouter.post('/', ratingController.createRating);
ratingRouter.delete('/:id', ratingController.deleteRating);

module.exports = ratingRouter;
