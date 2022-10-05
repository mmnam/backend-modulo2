const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = require ('../config/db');
const crypto = require('crypto');


const User = sequelize.define('Users', {
    usuario: {
        type: DataTypes.CHAR(64),
        allowNull: false
    },
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


User.createPassword = function(plainText) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
        .toString("hex");
    return {salt: salt, hash: hash}
}

User.validatePassword = function(password, user_salt, user_hash) {
    const hash = crypto
        .pbkdf2Sync(password, user_salt, 10000, 512, "sha512")
        .toString("hex");
    return user_hash === hash;
}

module.exports = User;