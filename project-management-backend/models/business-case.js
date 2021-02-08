const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const BusinessCase = sequelize.define('businessCase', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  benefit: {
    type: Sequelize.STRING
  },
  estimatedCost: {
    type: Sequelize.STRING
  },
  sponsor: {
    type: Sequelize.STRING
  },
  executiveSummary: {
    type: Sequelize.STRING
  },
  reason: {
    type: Sequelize.STRING
  },
  businessOption: {
    type: Sequelize.STRING
  },
  duration: {
    type: Sequelize.TIME
  },
  benefitTimescale: {
    type: Sequelize.STRING
  },
  negativeImpact: {
    type: Sequelize.STRING
  },
  customerImpactAndEngagement: {
    type: Sequelize.STRING
  },
  majorRisks: {
    type: Sequelize.STRING
  },
  diversityAndInclusionConsiderations: {
    type: Sequelize.STRING
  },
  investmentAppraisal: {
    type: Sequelize.STRING
  }
}, {timestamps: false});

module.exports = BusinessCase;
