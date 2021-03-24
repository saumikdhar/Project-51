const Project = require('../models/project');
const User = require('../models/user');
const BusinessCase = require('../models/business-case');
const UserProject = require('../models/user-project');
const sequelize = require('../util/database');
const { QueryTypes } = require('sequelize');
//----------------------------------------------------------------------------------------------------------------------
// Controller to retrieve a project by id

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
    const projects = await Project.findAll({include: [User, BusinessCase],
        where: { projectStatus: "Active" }})
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
    const projects = await Project.findAll({include: [User, BusinessCase],
        where: { projectStatus: "Pending" }})
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

exports.getAllArchivedProjects = async (req, res, next) => {
  // Tries to pull project information from the database with status pending returning as a JSON
  try {
    const projects = await Project.findAll({include: [User, BusinessCase],
      where: { projectStatus: "Archived" }})
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
    const quickWin = req.body.quickWin;
    const priorityScore = req.body.priorityScore;
    const projectStatus = 'Active';
    console.log("______________>", priorityScore)

    console.log("projectAccptUpdate",quickWin, priorityScore, id)
    if (quickWin === 'isQuickWin'){
      const smallProject = 'small'
      const boolTrue = true

      const projects = await Project.update(
        {
          projectStatus: projectStatus,
          projectScore: priorityScore,
          quickWin: boolTrue,
          projectSize: smallProject
        },
        { where: { id: id } }
      );

      res.status(200).json({
        success: true
      });
    } else {
      const largeProject = 'large'
      const boolFalse = false
      const projects = await Project.update(
        {
          projectStatus: projectStatus,
          priorityScore: priorityScore,
          quickWin: boolFalse,
          projectSize: largeProject
        },
        { where: { id: id } }
      );

      res.status(200).json({
        success: true
      });

    }

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
          userId: userId
        }
      });
      let projectToDeliver = [];

      for (let i = 0; i < projects.length; i++) {
        let project = await Project.findAll({
          where: {
            id: projects[i].projectId,
            projectStatus: 'Active'
          },
          include: [User]
        });
        projectToDeliver.push(project);
      }

      projects = [...projectToDeliver];
    } else {
      projects = await Project.findAll({
        where: {
          projectStatus: 'Active'
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
      projectStatus: 'Archive'
    },
    { where: { id: id } }
  );
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


//----------------------------------------------------------------------------------------------------------------------
// Controller to search for projects assinged to you.

exports.getSearchedProducts = async (req, res, next) => {
  const userId = req.body.userId;
  const role = req.body.role;
  let projects;
  const {keyword,searchField}=req.query;

  try {
    if (role !== 'transformationTeam') {
      projects = await UserProject.findAll({
        where: {
          userId: userId,
          
        }
      });
      let projectToDeliver = [];

      for (let i = 0; i < projects.length; i++) {
        let project;
        if(searchField=='name'){
           project = await Project.findAll({
            where: {
              id: projects[i].projectId,
              projectStatus: "Active",
              name:keyword
            },
            include: [User]
          });
        }

      else   if(searchField=='managername'){
           project = await Project.findAll({
            where: {
              id: projects[i].projectId,
              projectStatus: "Active",
              managername:keyword
            },
            include: [User]
          });
        } else if(searchField=='projectSize'){
           project = await Project.findAll({
            where: {
              id: projects[i].projectId,
              projectStatus: "Active",
              projectSize:keyword
            },
            include: [User]
          });
        }
        else if(searchField=='projectType'){
           project = await Project.findAll({
            where: {
              id: projects[i].projectId,
              projectStatus: "Active",
              projectType:keyword
            },
            include: [User]
          });
        }

        projectToDeliver.push(project);
      }

      projects = [...projectToDeliver];
      console.log('proejcts.leng',projects.length);
    } else {
      if(searchField=='name'){
        projects = await Project.findAll({
          where: {
            projectStatus: "Active",
            
            name:keyword
          },
          through: { UserProject },
          include: [User]
        });
     }

   else   if(searchField=='managername'){
    projects = await Project.findAll({
      where: {
        projectStatus: "Active",
        managername:keyword
      },
      through: { UserProject },
      include: [User]
    });
     } else if(searchField=='projectSize'){
      projects = await Project.findAll({
        where: {
          projectStatus: "Active",
          projectSize:keyword

        },
        through: { UserProject },
        include: [User]
      });
     }
     else if(searchField=='projectType'){
      projects = await Project.findAll({
        where: {
          projectStatus: "Active",
          projectType:keyword

        },
        through: { UserProject },
        include: [User]
      });
     }
console.log('projects leng',projects.length)
    
    }
    console.log('len',projects.length)
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
