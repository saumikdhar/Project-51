const BusinessCase = require('../models/business-case');
const Project = require('../models/project');
// const Op = require('../util/database');
const { body } = require('express-validator');
const Questionnaire = require('../models/questionnaire');

exports.getQuestionnaire = async (req, res, next) => {
  try {
    const questionnaire = await Questionnaire.findAll();
    if (!questionnaire) {
      const error = new Error('No data found');
      error.statusCode = 404;
      res.status(401).json({ error: error });
      throw error;
    }
    res.status(200).json({ questionnaire: questionnaire });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createProject = async (req, res, next) => {
  const newProject = req.body.newProject;
  try {
    await Project.create({
      name: newProject.name,
      projectStatus: 'pending',
      projectSize: newProject.projectSize,
      projectType: newProject.projectType,
      managerName: newProject.managerName,
      quickWin: null,
      questions: newProject.questions
    }).then(result => {
      res.status(200).json({ message: 'Successfully created the project' });
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
    res.status(500).json({ message: error.message });
  }
};
