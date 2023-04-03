const { configOptions } = require('./../config/config.js');

const USER = encodeURIComponent(configOptions.dbUser);
const PASSWORD = encodeURIComponent(configOptions.dbPassword);

const URI = `mysql://${USER}:${PASSWORD}@${configOptions.dbHost}:${configOptions.dbPort}/${configOptions.dbDatabase}`;


module.exports = {
  development: {
    url: URI,
    dialect: 'mysql',
  },
  production: {
    url: URI,
    dialect: 'mysql',
  },
  URI
};