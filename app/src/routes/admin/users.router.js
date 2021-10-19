const { Router } = require('express');

const { adminController: { usersController } } = require('../../controllers');
const { authMiddlewares: { isUserAdmin, checkAccessToken } } = require('../../middlewares');

const adminUserRouter = Router();

adminUserRouter.use(checkAccessToken);

adminUserRouter.put('/:user_id', usersController.editUser);

adminUserRouter.use(isUserAdmin);

adminUserRouter.get('/', usersController.getUsers);
adminUserRouter.get('/:user_id', usersController.getUserById);

module.exports = adminUserRouter;
