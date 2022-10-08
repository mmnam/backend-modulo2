const {Sequelize, DataTypes} = require ('sequelize');
const sequelize = require ('../config/db');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')

const User = sequelize.define('Users', {
    usuario: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
            isLowercase: true,
            is: /^[a-zA-Z0-9_-]+$/,
        }
    },
    nombre: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    apellidoPaterno: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    apellidoMaterno: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(64),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password_hash: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    password_salt: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    rol: {
        type: DataTypes.STRING(10),
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

User.generateJWT = function(user){
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    return jwt.sign({
        user:user.usuario,
        exp:parseInt(exp.getTime()/1000),
        rol:user.rol,
        id:user.id
    },secret)
}

module.exports = User;