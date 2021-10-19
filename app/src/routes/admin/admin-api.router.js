const { Router } = require('express');

const usersRouter = require('./users.router');

const adminApiRouter = Router();

adminApiRouter.use('/users', usersRouter);

module.exports = adminApiRouter;
