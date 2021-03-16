//----------------------------------------------------------------------------------------------------------------------
// Import project model
const Project = require('../models/project');
const User = require('../models/user');
const UserProject = require('../models/user-project');
const sequelize = require('../util/database');
const { QueryTypes } = require('sequelize');
//----------------------------------------------------------------------------------------------------------------------
// Controller to retrieve a project by id
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
    // On error return error message
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

//----------------------------------------------------------------------------------------------------------------------
// Controller to retrieve all active projects
exports.getAllActiveProjects = async (req, res, next) => {
  // Tries to pull project information from the database with status active returning as a JSON
  try {
    const projects = await Project.findAll({ where: { projectStatus: 'Active' } });
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

//----------------------------------------------------------------------------------------------------------------------
// Controller to retrieve all pending projects
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

//----------------------------------------------------------------------------------------------------------------------
// Controller to retrieve a project by id
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

//----------------------------------------------------------------------------------------------------------------------
// Controller to retrieve a project by id
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

//----------------------------------------------------------------------------------------------------------------------
// Controller to retrieve a assigned to a user

exports.getMyProjects = async (req, res, next) => {
  const userId = req.body.userId;
  const role = req.body.role;
  let projects;

  try {
    if (role !== 'transformationTeam') {
      projects = await UserProject.findAll({
        where: {
          userId: userId,
          
        }
      });
      let projectToDeliver = [];

      for (let i = 0; i < projects.length; i++) {
        let project = await Project.findAll({
          where: {
            id: projects[i].projectId,
            projectStatus: "Active"
          },
          include: [User]
        });
        projectToDeliver.push(project);
      }

      projects = [...projectToDeliver];
    } else {
      projects = await Project.findAll({
        where: {
          projectStatus: "Active"
        },
        through: { UserProject },
        include: [User]
      });
    }
    res.status(200).json({
      success: true,
      projects: projects
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//----------------------------------------------------------------------------------------------------------------------
// Controller to delete project
exports.deleteProject = async (req, res, next) => {
  const id = req.params.id;
  await Project.destroy({
    where: {
      id: id
    }
  });
};

//----------------------------------------------------------------------------------------------------------------------
// Controller to archive project
exports.archiveProject = async (req, res, next) => {
  const id = req.params.id;
  await Project.update(
    {
      projectStatus: "Archive"
    },
    { where: { id: id } }
  );
};