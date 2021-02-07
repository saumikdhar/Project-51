const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Action = sequelize.define("action", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  type: {
    type: Sequelize.STRING
  }
}, {timestamps: false} );

module.exports = Action;
