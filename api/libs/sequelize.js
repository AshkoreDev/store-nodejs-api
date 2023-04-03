const { Sequelize } = require('sequelize');
const { URI } = require('./../db/config.js');
const { configOptions } = require('./../config/config.js');
const setupModels  = require('./../db/models/index.js');


const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  // logging: true
  logging: console.log
});

// sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${configOptions.dbDatabase}\`;`);

setupModels(sequelize);
// sequelize.sync();

module.exports = { sequelize };