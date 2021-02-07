const express = require("express");
const bodyParser = require("body-parser");

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

User.belongsToMany(Project, { through: UserProject, constraints: true, onDelete: 'CASCADE'  });
Project.belongsToMany(User, { through: UserProject, constraints: true, onDelete: 'CASCADE'  });

Project.hasOne(BusinessCase);
BusinessCase.belongsTo(Project);

Updater.belongsToMany(Project,{through: UpdaterProject, constraints: true, onDelete: 'CASCADE' });
Project.belongsToMany(Updater, {through: UpdaterProject, constraints: true, onDelete: 'CASCADE' });

Project.hasOne(Scoreboard);
Scoreboard.hasMany(Objective);
Scoreboard.hasMany(Risk);
Scoreboard.hasMany(Action);

sequelize
  // .sync({force: true}) //Only use this when changing tables or fields
  .sync()
  .catch(err => console.log(err));

const server = app.listen(8080);