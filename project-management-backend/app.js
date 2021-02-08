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

//pre-population data for login
const createUser = async() =>{
  const hpw = await bcrypt.hash("password", 12);
  User.create({
    firstName: "foo",
    surname: "bar",
    email: "test@test.com",
    password: hpw,
    role: "employee"
})}

/*
sequelize
  .sync({force: true}) //Only use this when changing tables or fields
  // .sync()
  .then(user => {
    return createUser();
    })
  .catch(err => console.log(err));
*/

