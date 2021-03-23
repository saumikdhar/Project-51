const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Questionnaire = sequelize.define(
  'questionnaire',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    question: {
      type: Sequelize.STRING,
      allowNull: false
    },
    optionType: {
      type: Sequelize.STRING,
      allowNull: false
    },
    options: {
      type: Sequelize.JSON,
      allowNull: true,
      get: function () {
        return JSON.parse(this.getDataValue('options'));
      }
    }
  },
  { timestamps: false }
);

module.exports = Questionnaire;
