const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = require ('../config/db');
const User = require('./users');

const Orders = sequelize.define("Orders", {
    status: {
        type: DataTypes.CHAR(15),
        allowNull: false,
        defaultValue:'pending'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    montoTotal: {
        type: DataTypes.FLOAT
    }
});

User.hasMany(Orders);
Orders.belongsTo(User);

module.exports = Orders;