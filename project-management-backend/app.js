const express = require("express");
const bodyParser = require("body-parser");

// Sequelise
const sequelize = require("./util/database");
const User = require("./models/user");
const UserProject = require("./models/user-project");
const Project = require("./models/project");
const BusinessCase = require("./models/business-case");
const Risk = require("./models/risk");
const Objective = require("./models/objective");
const Action = require("./models/action");
const Updater = require("./models/updater");
const UpdaterProject = require("./models/updater-project");
const Scoreboard = require("./models/scoreboard");

//routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//bcrypt (remove this after and pre-populating data after functionality has been implmented)
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Set up routes to DB
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

User.belongsToMany(Project, { through: UserProject, constraints: true, onDelete: "CASCADE" });
Project.belongsToMany(User, { through: UserProject, constraints: true, onDelete: "CASCADE" });

Project.hasOne(BusinessCase);
BusinessCase.belongsTo(Project);

Updater.belongsToMany(Project, { through: UpdaterProject, constraints: true, onDelete: "CASCADE" });
Project.belongsToMany(Updater, { through: UpdaterProject, constraints: true, onDelete: "CASCADE" });

Project.hasOne(Scoreboard);
Scoreboard.hasMany(Objective);
Scoreboard.hasMany(Risk);
Scoreboard.hasMany(Action);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const server = app.listen(8080);

//pre-population dummy data
const populateDummyData = async() =>{
  const hpw = await bcrypt.hash("password", 12);
  const user1 = await User.create({
    firstName: "foo",
    surname: "bar",
    email: "test@test.com",
    password: hpw,
    role: "employee"
  });
  const user2 = await User.create({
    firstName: "fee",
    surname: "bor",
    email: "test1@test.com",
    password: hpw,
    role: "employee"
  });
  const project1 = await Project.create({
    name: "My Dummy Project",
    projectStatus: "Ongoing",
    quickWin: "Yes",
    projectType: "Dummy Project",
    questions: {},
  });
  const userProject1 = await UserProject.create({
    userId: user1.dataValues.id,
    projectId: project1.dataValues.id
  });
  const userProject2 = await UserProject.create({
    userId: user2.dataValues.id,
    projectId: project1.dataValues.id
  });
};

/*// Reinitialise database
sequelize
  .sync({force: true}) //Only use this when changing tables or fields
  // .sync()
  .then(dummyData => {
    return populateDummyData();
    })
  .catch(err => console.log(err));
*/

