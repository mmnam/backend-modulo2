const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = require ('../config/db');
const Product = require('../models/products');
const Order = require('../models/orders');

const Order_details = sequelize.define("Order_details", {
    precioUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Product.hasMany(Order_details);
Order_details.belongsTo(Product);

Order.hasMany(Order_details);
Order_details.belongsTo(Order);

module.exports = Order_details;