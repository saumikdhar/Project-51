//----------------------------------------------------------------------------------------------------------------------
// Import sequelize
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//----------------------------------------------------------------------------------------------------------------------
// Model for projects
const Project = sequelize.define('project', {
  //--------------------------------------------------------------------------------------------------------------------
  // Project Id; primary key
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project name; required
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project manager
  managerName: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project transformation lead / Admin
  transformationLead: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project priority score
  projectScore: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project status (Pending, Active, Complete, Archived)
  projectStatus: {
    type: Sequelize.STRING,
    allowNull: false
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project size
  projectSize: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project quick win
  quickWin: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project type (e.g. IT based)
  projectType: {
    type: Sequelize.STRING,
    allowNull: false
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project questions / notes
  questions: {
    type: Sequelize.JSON,
    allowNull: false,
    get: function () {
      return JSON.parse(this.getDataValue('questions'));
    }
  }
});

//----------------------------------------------------------------------------------------------------------------------
// Export project model
module.exports = Project;
