const { Sequelize } = require('sequelize');

const { apiLogger } = require('../logger/logger');

const {
    sequelizeConfig: {
        production: {
            username,
            password,
            database,
            host,
            dialect
        }
    },
} = require('../config');

try {
    const sequelize = new Sequelize(
        database,
        username,
        password, {
            host,
            dialect,
            dialectOptions: {
                decimalNumbers: true,
            },
            logging: (msg) => apiLogger.debug(msg),
        }
    );

    sequelize.Sequelize.DataTypes.postgres.DECIMAL.parse = parseFloat;

    module.exports.sequelize = sequelize;
} catch (e) {
    console.log(e);
}
