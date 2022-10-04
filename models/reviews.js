const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = require ('../config/db');
const User = require('../models/users');
const Products = require('../models/products');

const Reviews = sequelize.define("Reviews", {
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
});

User.hasMany(Reviews);
Reviews.belongsTo(User);

Products.hasMany(Reviews);
Reviews.belongsTo(Products);

module.exports = Reviews;