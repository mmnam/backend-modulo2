const express = require('express');
const sequelize = require('./config/db');

const app = express();
app.use(express.json());

try {
    sequelize.authenticate();
    sequelize.sync();
    console.log('Connected to DB');
} catch (error) {
    console.log('Unable to connect to DB:', error);
}

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server listing on PORT 3000");
});


/* import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite:db.sqlite3');

console.log('hoooola!')

const User = sequelize.define("User", {
    nombre: DataTypes.STRING,
    appellidoPaterno: DataTypes.STRING,
    appellidoMaterno: DataTypes.STRING,
    correo: DataTypes.STRING,
    rol: DataTypes.STRING
});

const Orders = sequelize.define("Orders", {
    estado: DataTypes.STRING,
    fecha: DataTypes.DATE,
    montoTotal: DataTypes.FLOAT
});

const Products = sequelize.define("Products", {
    nombreProducto: DataTypes.STRING,
    precio: DataTypes.FLOAT,
    descripcion: DataTypes.TEXT,
    categoria: DataTypes.STRING,
    status: DataTypes.STRING
});

const Reviews = sequelize.define("Reviews", {
    calificacion: DataTypes.INTEGER,
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    date: DataTypes.DATE
})

User.hasMany(Orders);
Orders.belongsTo(User);

Orders.hasMany(Products);
Products.hasMany(Orders);

User.hasMany(Reviews);
Reviews.belongsTo(User);

Products.hasMany(Reviews);
Reviews.belongsTo(Products);

await sequelize.sync(); */



