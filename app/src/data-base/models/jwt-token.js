const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../index');

class TokenModal extends Model {
}

TokenModal.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    access_token: {
        type: DataTypes.STRING,
        allowNull: false
    },

    refresh_token: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize });

const User = require('./user');

TokenModal.belongsTo(User, { foreignKey: 'user_id' });

module.exports = TokenModal;
