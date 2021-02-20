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
const projectRoutes = require("./routes/projects")
const scoreboardRoutes=require('./routes/scoreboard')
const businessCaseRoutes=require('./routes/businessCase')

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
app.use("/projects", projectRoutes)
app.use('/scoreboards',scoreboardRoutes)
app.use('/businessCase',businessCaseRoutes)

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
  console.log("Adding dummy data...");
  const hpw = await bcrypt.hash("password", 12);
  const user1 = User.create({
    firstName: "fn1",
    surname: "sur1",
    email: "test1@test.com",
    password: hpw,
    role: "employee"
  });
  const user2 = User.create({
    firstName: "fn2",
    surname: "sur2",
    email: "test2@test.com",
    password: hpw,
    role: "employee"
  });

  const project1 = Project.create({
    name: "My Dummy Project",
    projectStatus: "Ongoing",
    quickWin: true,
    projectType: "Dummy Project",
    questions: {},
  });

  const userProject1 = UserProject.create({
    userId: user1.id,
    projectId: project1.id
  });
  const userProject2 = UserProject.create({
    userId: user2.id,
    projectId: project1.id
  });

  const businessCase1 = BusinessCase.create({
    benefit: "Big Benefit",
    estimatedCost: "20000",
    sponsor: "George Tester",
    executiveSummary: "Big and Good Summary",
    reason: "Important Reason",
    businessOption: "The Option",
    duration: "2021-05-06T12:00:00.000Z",
    benefitTimescale: "Long",
    negativeImpact: "Low",
    customerImpactAndEngagement: "High",
    majorRisks: null,
    diversityAndInclusionConsiderations: "Yes",
    investmentAppraisal: "30000",
    projectId: "1"
  });

  const scoreboard1 = Scoreboard.create({
    riskNarrative: "The Risk Narrative",
    objectiveNarrative: "The Objective Narrative",
    actionNarrative: "The Action Narrative",
    projectId: "1"
  });

  const action1 = Action.create({
    type: "Big Action Type",
    scoreboardId: scoreboard1.id
  });

  const objective1 = Objective.create({
    type: "Big Objective Type",
    scoreboardId: scoreboard1.id
  });

  const risk1 = Risk.create({
    type: "Big Risk Type",
    scoreboardId: scoreboard1.id
  });

  const updater1 = Updater.create({
    firstName: "fn3",
    surname: "sur3",
    email: "test3@test.com",
    phoneNumber: "098765432101",
    keepMeUpdated: false
  });

  const updaterProject1 = UpdaterProject.create({
    projectId: project1.id,
    updaterId: updater1.id
  });

  console.log("Adding dummy data complete!")
};


// sequelize
//   .sync({force: true}) //Only use this when changing tables or fields
//   // .sync()
//   .then(dummyData => {
//     return populateDummyData();
//     })
//   .catch(err => console.log(err));


