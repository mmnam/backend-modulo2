const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = require ('../config/db');
const User = require('../models/users');

const Orders = sequelize.define("Orders", {
    status: {
        type: DataTypes.CHAR(15),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    montoTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

User.hasMany(Orders);
Orders.belongsTo(User);

module.exports = Orders;