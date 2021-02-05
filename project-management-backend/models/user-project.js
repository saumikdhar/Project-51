const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const UserProject = sequelize.define('user_project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = UserProject;
