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
  managerName: {
    type: Sequelize.STRING
  },
  transformationLead: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectScore: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectStatus: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectSize: {
    type: Sequelize.STRING
  },
  quickWin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  projectType: {
    type: Sequelize.STRING
  },
  questions: {
    type: Sequelize.JSON
  }
});

module.exports = Project;
