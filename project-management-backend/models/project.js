const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = Project;
