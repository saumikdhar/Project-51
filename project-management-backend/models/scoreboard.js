const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Scoreboard = sequelize.define('scoreboard', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  riskNarrative: {
    type: Sequelize.TEXT
  },
  objectiveNarrative: {
    type: Sequelize.TEXT
  },
  actionNarrative: {
    type: Sequelize.TEXT
  }
});

module.exports = Scoreboard;
