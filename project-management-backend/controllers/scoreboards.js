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
