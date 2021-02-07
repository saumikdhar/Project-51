const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Objective = sequelize.define("objective", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING
  }
});

module.exports = Objective;
