const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './paylyt.sqlite',
  logging: false
});

module.exports = sequelize;