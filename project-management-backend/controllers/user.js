const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserProject = require('../models/user-project');
const Project = require('../models/project');
const {Op} = require('sequelize');

exports.addUser = async (req, res, next) => {
  const email = req.body.email;
  const initialProject = parseInt(req.body.initialProject);
  try {
    const user = await User.findOne({where: {email: email}});
    if (user) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 400;
      throw error;
    }
    const hpw = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      firstName: req.body.firstName,
      surname: req.body.surname,
      email: email,
      password: hpw,
      role: req.body.role
    });

    if (initialProject) {
      await UserProject.create({
        userId: newUser.id,
        projectId: initialProject
      });
    }

    res.status(200).json({success: true});
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({error: error});
  }
};

exports.editUser = async (req, res, next) => {
  const userId = req.body.userId;
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const email = req.body.email;
  const role = req.body.role;

  try {
    const user = await User.findOne({where: {id: userId}});
    if (user == null) {
      const error = new Error('This user does not exist.');
      error.statusCode = 400;
      throw error;
    }

    User.update({
      firstName: firstName,
      surname: surname,
      email: email,
      role: role
    }, {where: {id: userId}});

    res.status(200).json({success: true});
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({error: error});
  }
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.body.userId;

  try {
    const user = await User.findOne({where: {id: userId}});
    if (user == null) {
      const error = new Error('This user does not exist.');
      error.statusCode = 400;
      throw error;
    }

    User.destroy({where: {id: userId}});

    res.status(200).json({success: true});
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({error: error});
  }
};

exports.getAllProjectUsersByUserId = async (req, res) => {
  const userId = req.userId;
  try {
    const userProjects = await UserProject.findAll({where: {userId: userId}});
    if (userProjects.length === 0) {
      const user = [
        (
          await User.findOne({
            where: {id: userId},
            attributes: ['id', 'firstName', 'surname', 'email', 'role']
          })
        ).dataValues
      ];

      res.status(200).json({users: user});
      return;
    }

    let users = {};
    let projectUsers = [];
    let userProject = null;

    for (let userPs of userProjects) {
      projectUsers = [];
      userProject = await UserProject.findAll({where: {projectId: userPs.projectId}});
      for (let userP of userProject) {
        projectUsers.push(
          (
            await User.findOne({
              where: {id: userP.userId},
              attributes: ['id', 'firstName', 'surname', 'email', 'role']
            })
          ).dataValues
        );
      }
      users[userPs.projectId] = {
        project: (await Project.findOne({where: {id: userPs.projectId}})).dataValues,
        users: projectUsers
      };
    }

    res.status(200).json({users: users});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    res.status(error.statusCode).json({error: error});
  }
};

exports.getAllProjectUsers = async (req, res) => {
  try {
    const projects = await Project.findAll();

    let users = {};
    let projectUsers = [];
    let userProject = null;

    for (let project of projects) {
      projectUsers = [];
      userProject = await UserProject.findAll({where: {projectId: project.id}});
      for (let userP of userProject) {
        projectUsers.push(
          (
            await User.findOne({
              where: {id: userP.userId},
              attributes: ['id', 'firstName', 'surname', 'email', 'role']
            })
          ).dataValues
        );
      }

      users[project.id] = {
        project: project.dataValues,
        users: projectUsers
      };
    }

    res.status(200).json({users: users});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    res.status(error.statusCode).json({error: error});
  }
};

exports.getAllProjectUsers = async (req, res) => {
  try {
    const projects = await Project.findAll();

    let users = {};
    let projectUsers = [];
    let userProject = null;

    for (let project of projects) {
      projectUsers = [];
      userProject = await UserProject.findAll({where: {projectId: project.id}});
      for (let userP of userProject) {
        projectUsers.push(
          (
            await User.findOne({
              where: {id: userP.userId},
              attributes: ['id', 'firstName', 'surname', 'email', 'role']
            })
          ).dataValues
        );
      }

      users[project.id] = {
        project: project.dataValues,
        users: projectUsers
      };
    }

    users[0] = {
      project: {id: 0, name: "All Users"},
      users: await User.findAll()
    };

    res.status(200).json({users: users});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    res.status(error.statusCode).json({error: error});
  }
};

exports.getUsers = async (req, res, next) => {
  const role = req.body.role;
  let users;
  console.log('here');
  try {
    if (role === 'manager') {
      users = await User.findAll({
        attributes: [['id', 'key'], 'firstName', 'surname', 'role', 'email'],
        where: {
          role: {[Op.notIn]: ['transformationTeam', 'manager']}
        }
      });
    } else if (role === 'transformationTeam') {
      users = await User.findAll({
        attributes: [['id', 'key'], 'firstName', 'surname', 'role', 'email']
      });
    }
    if (!users) {
      const error = new Error('No users found!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({users: users});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getUserProjects = async (req, res, next) => {
  const projectId = req.body.projectId;
  try {
    const users = await User.findAll({
      attributes: [['id', 'key'], 'firstName', 'surname', 'role'],
      include: [{model: UserProject, required: true, all: true, where: {id: projectId}}]
    });
    res.status(200).json({users: users});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.removeUserFromProject = async (req, res, next) => {
  const projectId = req.body.projectId;
  const userId = req.body.userId;

  try {
    await UserProject.destroy({
      where: {
        projectId: projectId,
        userId: userId
      }
    });
    res.status(200).json({response: 'User removed from project'});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.addUserToProject = async (req, res, next) => {
  const projectId = req.body.projectId;
  const userIdArray = req.body.userId;
  try {
    userIdArray.map(async userId => {
      const userProject = UserProject.findOne({where: {userId: userId, projectId: projectId}});
      // if (!userProject) {
      await UserProject.create(
        {
          userId: userId,
          projectId: projectId
        },
        {through: [User, Project]}
      );
      // }
    });
    res.status(200).json({response: 'User removed from project'});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
