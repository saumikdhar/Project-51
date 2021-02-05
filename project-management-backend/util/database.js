const Sequelize = require('sequelize');

const sequelize = new Sequelize('project_management_framework', 'root', 'comsc', {
  dialect: 'mysql',
  host: 'localhost',
  port: '3306'
});

module.exports = sequelize;