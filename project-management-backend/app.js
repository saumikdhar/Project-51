//----------------------------------------------------------------------------------------------------------------------
// Import express and body parser
const express = require('express');
const bodyParser = require('body-parser');

//----------------------------------------------------------------------------------------------------------------------
// Import sequelise and data models
const sequelize = require('./util/database');
const User = require('./models/user');
const UserProject = require('./models/user-project');
const Project = require('./models/project');
const BusinessCase = require('./models/business-case');
const Risk = require('./models/risk');
const Objective = require('./models/objective');
const Action = require('./models/action');
const Updater = require('./models/updater');
const UpdaterProject = require('./models/updater-project');
const Scoreboard = require('./models/scoreboard');

//----------------------------------------------------------------------------------------------------------------------
// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const scoreboardRoutes = require('./routes/scoreboard');
const businessCaseRoutes = require('./routes/businessCase');
const userRoutes = require('./routes/user');

//----------------------------------------------------------------------------------------------------------------------
// bcrypt (remove this after and pre-populating data after functionality has been implmented)
const bcrypt = require('bcryptjs');

//----------------------------------------------------------------------------------------------------------------------
// Set app to use express, body parserand the defult port
const app = express();
app.use(bodyParser.json());
const port = 8080

//----------------------------------------------------------------------------------------------------------------------
// Set access allowances
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE, UPDATE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//----------------------------------------------------------------------------------------------------------------------
// Set up routes to DB
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/scoreboards', scoreboardRoutes);
app.use('/businessCase', businessCaseRoutes);
app.use('/users', userRoutes);

//----------------------------------------------------------------------------------------------------------------------
// Set database relations
User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });

Project.hasOne(BusinessCase);
BusinessCase.belongsTo(Project);

Updater.belongsToMany(Project, { through: UpdaterProject, constraints: true, onDelete: 'CASCADE' });
Project.belongsToMany(Updater, { through: UpdaterProject, constraints: true, onDelete: 'CASCADE' });

Project.hasOne(Scoreboard);
Scoreboard.hasMany(Objective);
Scoreboard.hasMany(Risk);
Scoreboard.hasMany(Action);

//----------------------------------------------------------------------------------------------------------------------
// Set possible error
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//----------------------------------------------------------------------------------------------------------------------
// Start server
console.log('\n-------------------------------------------------------------------------------------------------------')
console.log('Server started on port ' + port)
const server = app.listen(port);

//----------------------------------------------------------------------------------------------------------------------
// Pre-population dummy data
const populateDummyData = async () => {
  console.log('Adding dummy data...');

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy user to the database
  const hpw1 = await bcrypt.hash('password', 12);
  const hpw2 = await bcrypt.hash('123', 12);
  const user1 = await User.create({
    firstName: 'fn1',
    surname: 'sur1',
    email: 'test1@test.com',
    password: hpw1,
    role: 'employee'
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy user to the database
  const user2 = await User.create({
    firstName: 'fn2',
    surname: 'sur2',
    email: 'test2@test.com',
    password: hpw1,
    role: 'manager'
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy user to the database
  const user3 = await User.create({
    firstName: 'fn3',
    surname: 'sur3',
    email: 'aa@aa.com',
    password: hpw2,
    role: 'transformationTeam'
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy project to the database
  const project1 = await Project.create({
    name: 'My Dummy Project',
    managerName: "Peter Parker",
    transformationLead: "Matt Murdock",
    projectScore: "15",
    projectStatus: 'Active',
    projectSize: "Large",
    quickWin: true,
    projectType: 'Dummy Project',
    questions: {}
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy project to the database
  const project2 = await Project.create({
    name: 'My Dummy Project 2',
    projectScore: "10",
    projectStatus: 'Pending',
    projectSize: "Large",
    quickWin: true,
    projectType: 'Dummy Project',
    questions: {}
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy project to the database
  const project3 = await Project.create({
    name: 'My Dummy Project 3',
    projectScore: "8",
    projectStatus: 'Pending',
    projectSize: "Large",
    quickWin: true,
    projectType: 'Dummy Project',
    questions: {}
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy userProject to the database
  const userProject1 = await UserProject.create({
    userId: user1.id,
    projectId: project1.id
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy userProject to the database
  const userProject2 = await UserProject.create({
    userId: user2.id,
    projectId: project1.id
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy userProject to the database
  const userProject3 = await UserProject.create({
    userId: user3.id,
    projectId: project1.id
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy business case to the database
  const businessCase1 = await BusinessCase.create({
    benefit: 'Big Benefit',
    estimatedCost: '20000',
    sponsor: 'George Tester',
    executiveSummary: 'Big and Good Summary',
    reason: 'Important Reason',
    businessOption: 'The Option',
    duration: '2021-05-06T12:00:00.000Z',
    benefitTimescale: 'Long',
    negativeImpact: 'Low',
    customerImpactAndEngagement: 'High',
    majorRisks: null,
    diversityAndInclusionConsiderations: 'Yes',
    investmentAppraisal: '30000',
    projectId: '1'
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy business case to the database
  const businessCase2 = await BusinessCase.create({
    benefit: 'Big Benefit',
    estimatedCost: '20000',
    sponsor: 'George Tester',
    executiveSummary: 'Big and Good Summary',
    reason: 'Important Reason',
    businessOption: 'The Option',
    duration: '2021-05-06T12:00:00.000Z',
    benefitTimescale: 'Long',
    negativeImpact: 'Low',
    customerImpactAndEngagement: 'High',
    majorRisks: null,
    diversityAndInclusionConsiderations: 'Yes',
    investmentAppraisal: '30000',
    projectId: '2'
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy business case to the database
  const businessCase3 = await BusinessCase.create({
    benefit: 'Big Benefit',
    estimatedCost: '20000',
    sponsor: 'George Tester',
    executiveSummary: 'Big and Good Summary',
    reason: 'Important Reason',
    businessOption: 'The Option',
    duration: '2021-05-06T12:00:00.000Z',
    benefitTimescale: 'Long',
    negativeImpact: 'Low',
    customerImpactAndEngagement: 'High',
    majorRisks: null,
    diversityAndInclusionConsiderations: 'Yes',
    investmentAppraisal: '30000',
    projectId: '3'
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy scoreboard to the database
  const scoreboard1 = await Scoreboard.create({
    riskNarrative: 'The Risk Narrative',
    objectiveNarrative: 'The Objective Narrative',
    actionNarrative: 'The Action Narrative',
    projectId: '1'
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy action to the database
  const action1 = await Action.create({
    type: 'Big Action Type',
    scoreboardId: scoreboard1.id
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy objective to the database
  const objective1 = await Objective.create({
    type: 'Big Objective Type',
    scoreboardId: scoreboard1.id
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy risk to the database
  const risk1 = await Risk.create({
    type: 'Big Risk Type',
    scoreboardId: scoreboard1.id
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy updater to the database
  const updater1 = await Updater.create({
    firstName: 'fn3',
    surname: 'sur3',
    email: 'test3@test.com',
    phoneNumber: '098765432101',
    keepMeUpdated: false
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy userProject to the database
  const updaterProject1 = await UpdaterProject.create({
    projectId: project1.id,
    updaterId: updater1.id
  });

  console.log('Adding dummy data complete!');
};

//----------------------------------------------------------------------------------------------------------------------
// Add users to the database
const createUser = async () => {
  const hpw = await bcrypt.hash('password', 12);
  for (let i = 0; i < 100; i++) {
    await User.create({
      firstName: `foo ${i + 1}`,
      surname: 'bar',
      role: 'employee',
      email: `foo${i + 1}bar@Hafod.co.uk`,
      password: hpw
    });
  }
};

//--------------------------------------------------------------------------------------------------------------------
// Set the database to repopulate (Uncomment and run to set database)


 // sequelize
 //   .sync({ force: true }) //Only use this when changing tables or fields
 //   // .sync()
 //   .then(dummyData => {
 //     return populateDummyData();
 //   })
 //   .catch(err => console.log(err));

