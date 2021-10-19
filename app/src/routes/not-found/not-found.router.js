const { Router } = require('express');

const notFoundRouter = Router();

notFoundRouter.all('*', (req, res) => {
    res.end('Route not found');
});

module.exports = notFoundRouter;
