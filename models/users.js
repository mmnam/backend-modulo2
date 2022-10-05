const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = require ('../config/db');

const Users = sequelize.define('Users', {
    nombre: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
    apellidoPaterno: {
        type: DataTypes.CHAR(128),
        allowNull: false
    },
    apellidoMaterno: {
        type: DataTypes.CHAR(128),
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.CHAR(64),
        allowNull: true
    },
    password_salt: {
        type: DataTypes.CHAR(64),
        allowNull: true
    },
    rol: {
        type: DataTypes.CHAR(15),
        allowNull: true
    }
});

module.exports = Users;