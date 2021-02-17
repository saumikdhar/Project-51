const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Updater = sequelize.define("updater", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
  },
  surname: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  phoneNumber: {
    type: Sequelize.STRING,
  },
  keepMeUpdated: {
    type: Sequelize.BOOLEAN,
  }
});

module.exports = Updater;
