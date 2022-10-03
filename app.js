import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite:db.sqlite3');

console.log('hoooola!')

const User = sequelize.define("User", {
    nombre: DataTypes.STRING,
    appellidoPaterno: DataTypes.STRING,
    appellidoMaterno: DataTypes.STRING,
    correo: DataTypes.STRING,
    rol: DataTypes.STRING
});