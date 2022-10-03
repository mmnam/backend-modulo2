const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sqlite:db.sqlite3');

console.log('hoooola!')