//----------------------------------------------------------------------------------------------------------------------
// Import sequelize
const Sequelize = require('sequelize');
const sequelize = require('../util/database');

//----------------------------------------------------------------------------------------------------------------------
// Model for business case
const BusinessCase = sequelize.define('businessCase', {

  //--------------------------------------------------------------------------------------------------------------------
  // Business case Id; primary key
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project benefit
  benefit: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project estimated cost
  estimatedCost: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project sponsor
  sponsor: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project executive summary
  executiveSummary: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project reason
  reason: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project business option
  businessOption: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project proposed duration
  duration: {
    type: Sequelize.DATE
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project timescale
  benefitTimescale: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project negative impact
  negativeImpact: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project customer impact and engagement
  customerImpactAndEngagement: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project major risks
  majorRisks: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project diversity and inclusion considerations
  diversityAndInclusionConsiderations: {
    type: Sequelize.STRING
  },

  //--------------------------------------------------------------------------------------------------------------------
  // Project investment appraisal
  investmentAppraisal: {
    type: Sequelize.STRING
  }
}, {timestamps: false});

//----------------------------------------------------------------------------------------------------------------------
// Export business case model
module.exports = BusinessCase;
