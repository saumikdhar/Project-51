const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const UpdaterProject = sequelize.define("updaterProject", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});
module.exports = UpdaterProject;
