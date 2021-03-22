const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.RDS_DB_NAME,
  process.env.RDS_USERNAME,
  process.env.RDS_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.RDS_URL,
    port: process.env.RDS_PORT,
    language: 'en'
  }
);

module.exports = sequelize;
