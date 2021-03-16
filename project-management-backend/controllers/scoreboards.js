const Project = require('../models/project');
const Scoreboard = require('../models/scoreboard');

exports.getScoreboard = async (req, res, next) => {
  const projectId = req.body.projectId;
  try {
    const scoreboard = await Scoreboard.findAll({
      where: {
        projectId: projectId
      }
    });
    if (!scoreboard) {
      const error = new Error('Scoreboard not found!');
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
