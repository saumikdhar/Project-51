const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserProject = require('../models/user-project');

exports.addUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const projectId = req.body.projectId;
  console.log(req.body)
  try {
    const user = await User.findOne({where: {email: email}});
    if (user) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 400;
      throw error;
    }
    const hpw = await bcrypt.hash(password, 12);
    const newUser = User.create({
      firstName: firstName,
      surname: surname,
      email: email,
      password: hpw,
      role: role
    });

    if (projectId) {
      UserProject.create({
        userId: newUser.id,
        projectId: projectId
      });
    }

    res.status(200);
  } catch (error) {
    console.log("ERROR: ", error)
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    res.status(error.statusCode).json({error: error});
  }
};

exports.allUsers = async (req, res) => {
  const userId = req.body.userId;
  try {
    const userProject = await UserProject.findOne({where: {id: userId}});
    const projectId = userProject.projectId;
    const userProjects = await UserProject.findAll({where: {projectId: projectId}});

    let users = [];
    for (let userP of userProjects) {
      users.push((await User.findOne({
        where: {id: userP.dataValues.id}, attributes:
          ['id', 'firstName', 'surname', 'email', 'role']
      })).dataValues)
    }

    res.status(200).json({users: users, projectId: projectId});
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log(error);
    res.status(error.statusCode).json({error: error});
  }
};