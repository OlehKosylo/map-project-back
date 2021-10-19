const { Router } = require('express');

const adminRouter = require('../admin/admin-api.router');
const usersRouter = require('../users/users.router');
const authRouter = require('../auth/auth.router');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);

apiRouter.use('/admin', adminRouter);

module.exports = apiRouter;
