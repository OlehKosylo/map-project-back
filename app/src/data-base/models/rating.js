const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../index');

class Rating extends Model {
}

Rating.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    score: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    place_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { sequelize });

const User = require('./user');
const Place = require('./place');

Rating.belongsTo(User, {
    foreignKey: 'user_id',
});

Place.hasMany(Rating, {
    foreignKey: 'place_id'
})

module.exports = Rating;
