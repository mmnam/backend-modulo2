const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = require ('../config/db');

const Products = sequelize.define("Products", {
    nombreProducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.CHAR(15),
        allowNull: false
    }
});

module.exports = Products;