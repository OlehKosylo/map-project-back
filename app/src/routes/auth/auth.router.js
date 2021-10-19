const { Router } = require('express');

const { authMiddlewares } = require('../../middlewares');
const { authController } = require('../../controllers');

const authRouter = Router();

authRouter.post('/', authController.loginUser);
authRouter.post('/logout', authController.logoutUser);

authRouter.post('/refresh', authMiddlewares.checkRefreshToken, authController.refreshToken);

authRouter.post('/registration',
    authMiddlewares.isUserExistByEmailOrPhone,
    authController.createUser);

module.exports = authRouter;
