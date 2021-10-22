const { Model, DataTypes } = require('sequelize');

const { userRole } = require('../../constants/enums');
const { sequelize } = require('../index');

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_role: {
        type: DataTypes.INTEGER,
        defaultValue: userRole.ADMIN,
        allowNull: false
    },

    display_name: {
        type: DataTypes.STRING,
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { sequelize });

module.exports = User;
