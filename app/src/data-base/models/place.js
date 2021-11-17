const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../index');

class Place extends Model {
}

Place.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    lat: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lng: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    tag: {
        type: DataTypes.STRING
    },

    img: {
        type: DataTypes.TEXT
    }
}, { sequelize });

const User = require('./user');

Place.belongsToMany(User, {
    through: 'places_users',
    foreignKey: 'place_id',
});

User.belongsToMany(Place, {
    through: 'places_users',
    foreignKey: 'user_id',
});

module.exports = Place;
