const Project = require('../models/project');
const User = require('../models/user');

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.findAll({ include: [User] });
    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    // On error return error message
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.projectDetails = async (req, res, next) => {
  // Tries to pull project information from the database with passed id returning as a JSON
  try {
    const id = req.params.id;
    const projects = await Project.findOne({ where: { id: id } });
    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.getAllActiveProjects = async (req, res, next) => {
  // Tries to pull project information from the database with status active returning as a JSON
  try {
    const projects = await Project.findAll({ where: { projectStatus: 'Active' } });
    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.getAllPendingProjects = async (req, res, next) => {
  // Tries to pull project information from the database with status pending returning as a JSON
  try {
    const projects = await Project.findAll({ where: { projectStatus: 'Pending' } });
    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    // On error return error message
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.projectAcceptUpdate = async (req, res, next) => {
  // Tries to update project manager and transformation lead field based on id and change status to active
  try {
    const id = req.params.id;
    const managerName = req.body.manager;
    const transformationLead = req.body.transformationLead;
    const projectStatus = 'Active';

    const projects = await Project.update(
      {
        managerName: managerName,
        transformationLead: transformationLead,
        projectStatus: projectStatus
      },
      { where: { id: id } }
    );

    res.status(200).json({
      success: true
    });
  } catch (error) {
    // On error return error message
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.projectRejectUpdate = async (req, res, next) => {
  // Tries to update questions field based on id and set status to rejected
  try {
    const id = req.params.id;
    const questions = req.body.questions;
    const projectStatus = 'Rejected';

    const projects = await Project.update(
      {
        questions: questions,
        projectStatus: projectStatus
      },
      { where: { id: id } }
    );

    res.status(200).json({
      success: true
    });
  } catch (error) {
    // On error return error message
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};
