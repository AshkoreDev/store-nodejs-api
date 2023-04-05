require('dotenv').config();

const configOptions = {
  
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3200,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbDatabase: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT
};


module.exports = { configOptions };