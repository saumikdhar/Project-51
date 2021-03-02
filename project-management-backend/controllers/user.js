const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserProject = require('../models/user-project');
const Project = require('../models/project');
const { Op } = require('sequelize');

exports.addUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const projectId = parseInt(req.body.projectId);
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 400;
      throw error;
    }
    const hpw = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      firstName: firstName,
      surname: surname,
      email: email,
      password: hpw,
      role: role
    });

    if (projectId) {
      await UserProject.create({
        userId: newUser.id,
        projectId: projectId
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({ error: error });
  }
};

exports.getAllUsers = async (req, res) => {
  const userId = req.body.userId;
  try {
    const userProject = await UserProject.findOne({ where: { id: userId } });
    const projectId = userProject.projectId;
    const userProjects = await UserProject.findAll({ where: { projectId: projectId } });

    let users = [];
    for (let userP of userProjects) {
      users.push(
        (
          await User.findOne({
            where: { id: userP.dataValues.id },
            attributes: ['id', 'firstName', 'surname', 'email', 'role']
          })
        ).dataValues
      );
    }

    res.status(200).json({ users: users, projectId: projectId });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    res.status(error.statusCode).json({ error: error });
  }
};

exports.getUsers = async (req, res, next) => {
  const role = req.body.role;
  let users;
  try {
    if (role === 'manager' || 'projectManager') {
      users = await User.findAll({
        attributes: [['id', 'key'], 'firstName', 'surname', 'role', 'email'],
        where: {
          role: { [Op.notIn]: ['Transformationteam', 'manager', 'projectManager'] }
        }
      });
    } else if (role === 'transformationTeam') {
      users = await User.findAll({
        attributes: [['id', 'key'], 'firstName', 'surname', 'role', 'email'],
        where: { role: { [Op.not]: 'transformationTeam' } }
      });
    }
    if (!users) {
      const error = new Error('No users found!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ users: users });
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
      include: [{ model: UserProject, required: true, all: true, where: { id: projectId } }]
    });
    res.status(200).json({ users: users });
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
    res.status(200).json({ response: 'User removed from project' });
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
      const userProject = UserProject.findOne({ where: { userId: userId, projectId: projectId } });
      // if (!userProject) {
      await UserProject.create(
        {
          userId: userId,
          projectId: projectId
        },
        { through: [User, Project] }
      );
      // }
    });
    res.status(200).json({ response: 'User removed from project' });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
