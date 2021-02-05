const express = require("express");
const bodyParser = require("body-parser");

const sequelize = require("./util/database");
const User = require("./models/user");
const UserProject = require("./models/user-project");
const Project = require("./models/project");

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

User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });

sequelize
  .sync({force: true}) //Only use this when changing tables or fields
  // .sync()
  .catch(err => console.log(err));
const server = app.listen(8080);