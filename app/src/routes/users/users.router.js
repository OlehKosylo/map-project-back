const { Router } = require('express');

const { usersController } = require('../../controllers');
const { authMiddlewares: { checkAccessToken, isUserAuthorization } } = require('../../middlewares');

const usersRouter = Router();

usersRouter.get('/:id', isUserAuthorization, usersController.getUserById);

usersRouter.use(checkAccessToken);

usersRouter.get('/', usersController.getAllUsers);
usersRouter.patch('/', usersController.updateUser);
usersRouter.patch('/password', usersController.updatePassword);

module.exports = usersRouter;
