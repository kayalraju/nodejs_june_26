const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('authCrud', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports = sequelize;

