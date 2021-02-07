const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Scoreboard = sequelize.define("scoreboard", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  riskNarrative: {
    type: Sequelize.STRING
  },
  objectiveNarrative: {
    type: Sequelize.STRING
  },
  actionNarrative: {
    type: Sequelize.STRING
  }
});

module.exports = Scoreboard;
