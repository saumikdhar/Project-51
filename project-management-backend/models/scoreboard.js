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
    type: Sequelize.STRING(10000)
  },
  objectiveNarrative: {
    type: Sequelize.STRING(10000)
  },
  actionNarrative: {
    type: Sequelize.STRING(10000)
  }
});

module.exports = Scoreboard;
