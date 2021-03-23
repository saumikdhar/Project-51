const Scoreboard = require('../models/scoreboard');
const Risk = require('../models/risk');
const Objective = require('../models/objective');
const Action = require('../models/action');
const Sequelize = require('../util/database');

exports.getScoreboard = async (req, res, next) => {
  const projectId = req.body.projectId;
  try {
    const scoreboard = await Scoreboard.findAll({
      where: {
        projectId: projectId
      },
      include: [
        {
          model: Objective,
          separate: true,
          attributes: {
            include: [[Sequelize.fn('count', Sequelize.col('objective.type')), 'count']]
          },
          group: ['objective.type']
        },
        {
          model: Risk,
          separate: true,
          attributes: {
            include: [[Sequelize.fn('count', Sequelize.col('risk.type')), 'count']]
          },
          group: ['risk.type']
        },
        {
          model: Action,
          separate: true,
          attributes: {
            include: [[Sequelize.fn('count', Sequelize.col('action.type')), 'count']]
          },
          group: ['action.type']
        }
      ]
    });

    if (!scoreboard) {
      const error = new Error('Scoreboard data not found!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: scoreboard
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.saveObjectiveNarrative = async (req, res, next) => {
  const projectId = req.body.projectId;
  const objectiveNarrative = req.body.objectiveNarrative;
  try {
    const scoreboard = await Scoreboard.findOne({ where: { projectId: projectId } });

    if (!scoreboard) {
      await Scoreboard.create({ projectId: projectId });
    }

    const updatedObjectiveNarrative = await Scoreboard.update(
      { objectiveNarrative: objectiveNarrative },
      { where: { projectId: projectId } }
    );

    if (!updatedObjectiveNarrative) {
      const error = new Error('Failed to save changes to objective narrative');
      error.statusCode = 409;
      throw error;
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.saveRiskNarrative = async (req, res, next) => {
  const projectId = req.body.projectId;
  const riskNarrative = req.body.riskNarrative;

  try {
    const scoreboard = await Scoreboard.findOne({ where: { projectId: projectId } });

    if (!scoreboard) {
      await Scoreboard.create({ projectId: projectId });
    }

    const updatedRiskNarrative = await Scoreboard.update(
      { riskNarrative: riskNarrative },
      { where: { projectId: projectId } }
    );

    if (!updatedRiskNarrative) {
      const error = new Error('Failed to save changes to risk narrative');
      error.statusCode = 409;
      throw error;
    }

    res.status(200).json({
      success: true
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.saveActionNarrative = async (req, res, next) => {
  const projectId = req.body.projectId;
  const actionNarrative = req.body.actionNarrative;
  try {
    const scoreboard = await Scoreboard.findOne({ where: { projectId: projectId } });

    if (!scoreboard) {
      await Scoreboard.create({ projectId: projectId });
    }

    const updatedActionNarrative = await Scoreboard.update(
      { actionNarrative: actionNarrative },
      { where: { projectId: projectId } }
    );

    if (!updatedActionNarrative) {
      const error = new Error('Failed to save changes to action narrative');
      error.statusCode = 409;
      throw error;
    }
    res.status(200).json({
      success: true
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
