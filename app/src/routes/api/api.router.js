const { Router } = require('express');

const adminRouter = require('../admin/admin-api.router');
const usersRouter = require('../users/users.router');
const placeRouter = require('../places/places.router');
const ratingRouter = require('../rating/rating.router');
const authRouter = require('../auth/auth.router');

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/places', placeRouter);
apiRouter.use('/rating', ratingRouter);

apiRouter.use('/admin', adminRouter);

module.exports = apiRouter;
