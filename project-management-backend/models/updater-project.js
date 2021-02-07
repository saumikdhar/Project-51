const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UpdaterProject = sequelize.define("updater_project", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
module.exports = UpdaterProject;
