const path = require('path');
const uuid = require('uuid');
const helmet = require('helmet');
const express = require('express');

const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { responseStatusCode } = require('./constants/enums');
const { apiLogger } = require('./logger/logger');
const { statusError } = require('./errors');
const { appConfig } = require('./config');
const { apiRouter } = require('./routes');

const app = express();

app.use((req, res, next) => {
    req.id = uuid.v4();
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use(cors());

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || responseStatusCode.SERVER_ERROR)
        .json({
            message: err.message || statusError.UNEXPECTED.message,
            code: err.customCode || statusError.UNEXPECTED.code,
            params: err.params || {}
        });
});

process.on(appConfig.UNHANDLED_REJECTION, (reason) => {
    apiLogger.error(appConfig.UNHANDLED_REJECTION_HAPPENED, reason);
    process.exit(0);
});

module.exports = { app };
