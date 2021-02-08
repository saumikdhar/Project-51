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
    type: Sequelize.STRING,
    allowNull: false
  },
  projectStatus: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectSize: {
    type: Sequelize.STRING,
    allowNull: false
  },
  quickWin: {
    type: Sequelize.STRING,
    allowNull: false
  },
  projectType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  questions: {
    type: Sequelize.JSON,
    allowNull: false
  }
});

module.exports = Project;
