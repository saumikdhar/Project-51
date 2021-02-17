const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UserProject = require('../models/user-project');

exports.addUser = async (req, res, next) => {
  const firstName = req.body.firstName;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  try {
    const user = await User.findOne({where: { email: email} });
    if (user) {
      const error = new Error('A user with this email already exists.');
      error.statusCode = 400;
      throw error;
    }
    const hpw = await bcrypt.hash(password, 12);
    User.create({
      firstName: firstName,
      surname: surname,
      email: email,
      password: hpw,
      role: role
    });

    res.status(200);
  } catch (error) {
    if (!error.statusCode) { error.statusCode = 500; }
    res.status(error.statusCode).json({error:error});
  }
};

exports.allUsers = async (req, res) => {
  const userId = req.body.userId;
  try {
    const userProject = await UserProject.findOne({where: { id: userId} });
    const userProjects = await UserProject.findAll({where: { projectId: userProject.projectId} });
    let users = [];

    for(let userP of userProjects){
      users.push(await User.findOne({where: { id: userP.userId}, attributes:
          ['firstName', 'surname', 'email', 'role']
      }))
    }

    res.status(200).json({ users:users });
  } catch (error) {
    if (!error.statusCode) { error.statusCode = 500; }
    console.log(error);
    res.status(error.statusCode).json({error:error});
  }
};