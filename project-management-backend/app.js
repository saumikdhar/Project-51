const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

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
const Questionnaire = require('./models/questionnaire');

//----------------------------------------------------------------------------------------------------------------------
// Import routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const scoreboardRoutes = require('./routes/scoreboard');
const businessCaseRoutes = require('./routes/businessCase');
const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONT_END_URL);
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE, UPDATE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Set up routes to DB
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/scoreboards', scoreboardRoutes);
app.use('/businessCase', businessCaseRoutes);
app.use('/users', userRoutes);

// Set database relations
User.belongsToMany(Project, { through: UserProject });
Project.belongsToMany(User, { through: UserProject });

Project.hasOne(BusinessCase);
BusinessCase.belongsTo(Project);

Updater.belongsToMany(Project, { through: UpdaterProject, constraints: true, onDelete: 'CASCADE' });
Project.belongsToMany(Updater, { through: UpdaterProject, constraints: true, onDelete: 'CASCADE' });

Project.hasOne(Scoreboard);

Scoreboard.hasMany(Objective);
Objective.belongsTo(Scoreboard);

Scoreboard.hasMany(Risk);
Risk.belongsTo(Scoreboard);

Scoreboard.hasMany(Action);
Action.belongsTo(Scoreboard);

// Error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//create questionnaire form
const createQuestionnaire = async () => {
  await Questionnaire.create({
    question: '1. Please pick one from the following options *',
    optionType: 'multi-option',
    options: [
      'I would like to submit details of a change being made or planned',
      'I would like to submit a new Simplify idea'
    ]
  });
  await Questionnaire.create({
    question: 'Submitting details of a change',
    optionType: 'none',
    options: []
  });
  await Questionnaire.create({
    question: '2. What Change is being made? *',
    optionType: 'input',
    options: []
  });
  // await Questionnaire.create({
  //   question: '3. Who is the executive sponsor for the project *',
  //   optionType: 'multi-option',
  //   options: [
  //     'Jas Bains',
  //     'David Hayhoe',
  //     'Karen Rosser',
  //     'Tracy Healey',
  //     'Jamie Smith',
  //     'Gareth Yeoman Evans',
  //     'Jonathan Harker',
  //     'Elke Winton',
  //     'Luke Mitchell',
  //     'other'
  //   ]
  // });
  await Questionnaire.create({
    question: '4. Who is project manager? *',
    optionType: 'dropdown',
    options: []
  });
  await Questionnaire.create({
    question: '5. What stage is this change at? *',
    optionType: 'multi-option',
    options: ['Conception', 'Planning', 'Implementation', 'Review']
  });
  await Questionnaire.create({
    question: '6. Which department is leading the change? *',
    optionType: 'multi-option',
    options: [
      'Housing Services',
      'Support Services',
      'Customer Services',
      'Care Homes',
      'Home Care',
      'Asset Management',
      'Development',
      'Financial & Payroll',
      'IT',
      'HR',
      'Exec & Board',
      'Assurance & Quality',
      'Research & Innovation',
      'Communications',
      'Business Change & Performance',
      'Customer Engagement',
      'other'
    ]
  });
  await Questionnaire.create({
    question: '7. Which other departments does this change involve? *',
    optionType: 'multi-option',
    options: [
      'All departments',
      'Housing services',
      'Support Services',
      'Customer Services',
      'Care Homes',
      'Home Care',
      'Asset Management',
      'Development',
      'Financial & Payroll',
      'IT',
      'HR',
      'Exec & Board',
      'Assurance & Quality',
      'Research & Innovation',
      'Communications',
      'Business Change & Performance',
      'Customer Engagement',
      'other'
    ]
  });
  await Questionnaire.create({
    question: '8. Why is this change being made? *',
    optionType: 'textArea',
    options: []
  });
  await Questionnaire.create({
    question: '9. What are the objectives? *',
    optionType: 'textArea',
    options: []
  });
  await Questionnaire.create({
    question: '10. Is the Transformation Team involved in making this change? *',
    optionType: 'y/n',
    options: []
  });
  await Questionnaire.create({
    question: '11. Will IT resources be required to make this change? *',
    optionType: 'y/n',
    options: []
  });
  await Questionnaire.create({
    question: '12. What is the internal impact of the change? *',
    optionType: 'multi-option',
    options: [
      'Change impacts an individual only',
      'Change impacts part of a department',
      'Change impacts a whole department',
      'Change impacts several departments',
      'Change impacts the entire organisation'
    ]
  });
  await Questionnaire.create({
    question: '13. What is the value of the change? *',
    optionType: 'multi-option',
    options: [
      "Change is 'nice to have' ",
      "Change will improve efficiency but the current process doesn't cause failure",
      'Change will improve efficiency and prevent minor errors from occurring',
      'Change will prevent process failures e.g. incorrect data or reporting inaccuracy',
      'Change will prevent prevent organisation-wide failures'
    ]
  });
  await Questionnaire.create({
    question: '14. How does this change impact our customers? *',
    optionType: 'multi-option',
    options: [
      'No direct customer impact',
      'Minor impact for some customer groups',
      'Minor impact for all customer groups',
      'Significant impact for some customer groups',
      'Significant impact for all customer groups'
    ]
  });
  await Questionnaire.create({
    question: '15. Which customer groups will this change affect? *',
    optionType: 'multi-checkbox',
    options: [
      'Housing Customers',
      'Support Customers',
      'Care Customers',
      'Home Ownership Customers',
      'No customer groups affected'
    ]
  });
  await Questionnaire.create({
    question:
      '16. Have steps been taken to understand and engage with customers about this change? *',
    optionType: 'y/n',
    options: []
  });
  await Questionnaire.create({
    question:
      '17. If you answered yes to above question, please provide some details on how customers were',
    optionType: 'textArea',
    options: []
  });
  await Questionnaire.create({
    question: '18. Which strategic objective does this change relate to? *',
    optionType: 'multi-checkbox',
    options: [
      'Placing customers at the heart of everything that we do',
      'Strengthen our governance',
      'Maintaining our financial strength',
      'Integrating our housing, social care and support',
      'Investing in Housing',
      'Investing in Care',
      'Investing in our people',
      'Maximising our resources'
    ]
  });
  await Questionnaire.create({
    question: '19. What is the expected timescale for completing the change? *',
    optionType: 'multi-option',
    options: ['Short Term: 0-3 months', 'Medium Term: 3-12 months', 'Long Term: over 1 year']
  });
  await Questionnaire.create({
    question: '20. What is the start date for the project? *',
    optionType: 'date',
    options: []
  });
  await Questionnaire.create({
    question: '21. What is the end date for the project? *',
    optionType: 'date',
    options: []
  });
  await Questionnaire.create({
    question: '22. What is the estimated cost of making this change? *',
    optionType: 'number',
    options: []
  });
  await Questionnaire.create({
    question: '23. Are costs from an existing budget? *',
    optionType: 'y/n',
    options: []
  });
  await Questionnaire.create({
    question: '24. Is this change being made due to regulatory requirement? *',
    optionType: 'y/n',
    options: []
  });
  await Questionnaire.create({
    question: '25. Have you engaged with Information Governance regarding this change? *',
    optionType: 'y/n',
    options: []
  });
  await Questionnaire.create({
    question: '26. What is your name? *',
    optionType: 'input',
    options: []
  });
  await Questionnaire.create({
    question: '27. Which department do you work in? *',
    optionType: 'multi-option',
    options: [
      'Housing Services',
      'Support Services',
      'Customer Services',
      'Care Homes',
      'Home Care',
      'Asset Management',
      'Development',
      'Financial & Payroll',
      'IT',
      'HR',
      'Exec & Board',
      'Assurance & Quality',
      'Research & Innovation',
      'Communications',
      'Business Change & Performance',
      'Customer Engagement'
    ]
  });
  await Questionnaire.create({
    question: '28. Give your Simplify idea a title *',
    optionType: 'input',
    options: []
  });
  await Questionnaire.create({
    question: '29. What issue are you facing? *',
    optionType: 'textArea',
    options: []
  });
  await Questionnaire.create({
    question: '30. What does this issue relate to? *',
    optionType: 'multi-option',
    options: ['Reporting', 'Qlx', 'Something Else']
  });
  await Questionnaire.create({
    question: '31. What other teams does this affect? *',
    optionType: 'multi-checkbox',
    options: [
      'All departments',
      'Housing services',
      'Support Services',
      'Customer Services',
      'Care Homes',
      'Home Care',
      'Asset Management',
      'Development',
      'Financial & Payroll',
      'IT',
      'HR',
      'Exec & Board',
      'Assurance & Quality',
      'Research & Innovation',
      'Communications',
      'Business Change & Performance',
      'Customer Engagement'
    ]
  });
  await Questionnaire.create({
    question: '32. How will this issue impact our customers? *',
    optionType: 'multi-checkbox',
    options: [
      'Improve Customer Experience',
      'Improve customer well being',
      'Reduce complaints',
      'No direct customer impact'
    ]
  });
  await Questionnaire.create({
    question: '33. Which customer groups will be affected by addressing this issue? *',
    optionType: 'multi-checkbox',
    options: [
      'Housing Customers',
      'Support Customers',
      'Care Customers',
      'Home Ownership Customers',
      'No customer groups affected'
    ]
  });
  await Questionnaire.create({
    question: '34. What will be the internal impact of addressing this issue? *',
    optionType: 'multi-option',
    options: [
      'Change impacts an individual only',
      'Change impacts part of a department',
      'Change impacts a whole department',
      'Change impacts several departments',
      'Change impacts the entire organisation'
    ]
  });
  await Questionnaire.create({
    question: '35. What will the value of addressing this issue? *',
    optionType: 'multi-option',
    options: [
      "Change is 'nice to have' ",
      "Change will improve efficiency but the current process doesn't cause failure",
      'Change will improve efficiency and prevent minor errors from occurring',
      'Change will prevent process failures e.g. incorrect data or reporting inaccuracy',
      'Change will prevent prevent organisation-wide failures'
    ]
  });
  await Questionnaire.create({
    question: '36. Is there a deadline for addressing this issue?',
    optionType: 'date',
    options: []
  });
  await Questionnaire.create({
    question:
      '37. Covid-19 is driving Hafod to change many of its operations, is your issue or idea in response to Covid-19?',
    optionType: 'y/n',
    options: []
  });
};

app.listen(process.env.PORT || 8080);

const populateDummyData = async () => {
  const hpw1 = await bcrypt.hash('password', 12);
  const hpw2 = await bcrypt.hash('123', 12);
  const user1 = await User.create({
    firstName: 'fn1',
    surname: 'sur1',
    email: 'test1@test.com',
    password: hpw1,
    role: 'employee'
  });

  const user2 = await User.create({
    firstName: 'fn2',
    surname: 'sur2',
    email: 'test2@test.com',
    password: hpw1,
    role: 'manager'
  });

  const user3 = await User.create({
    firstName: 'fn3',
    surname: 'sur3',
    email: 'aa@aa.com',
    password: hpw2,
    role: 'transformationTeam'
  });

  const project1 = await Project.create({
    name: 'My Dummy Project',
    managerName: 'Peter Parker',
    transformationLead: 'Matt Murdock',
    projectScore: '15',
    projectStatus: 'Active',
    projectSize: 'Large',
    quickWin: true,
    projectType: 'Dummy Project',
    questions:[{question:'a', answers:'a'}, {question:'a', answers:'a'}]
  });

  const project2 = await Project.create({
    name: 'My Dummy Project 2',
    projectScore: '10',
    projectStatus: 'Active',
    projectSize: 'Small',
    quickWin: true,
    projectType: 'Dummy Project',
    questions: [{question:'a', answers:'a'}, {question:'a', answers:'a'}]
  });

  const project3 = await Project.create({
    name: 'My Dummy Project 3',
    projectScore: '8',
    projectStatus: 'Active',
    projectSize: 'Small',
    quickWin: true,
    projectType: 'Dummy Project',
    questions: [{question:'a', answers:'a'}, {question:'a', answers:'a'}]
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy project to the database
  const project4 = await Project.create({
    name: 'My Dummy Project 4',
    projectScore: "6",
    projectStatus: 'Archived',
    projectSize: "Large",
    quickWin: true,
    projectType: 'Dummy Project',
    questions: [{question:'a', answers:'a'}, {question:'a', answers:'a'}]
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy userProject to the database
  const userProject1 = await UserProject.create({
    userId: user1.id,
    projectId: project1.id
  });

  const userProject2 = await UserProject.create({
    userId: user2.id,
    projectId: project1.id
  });

  const userProject3 = await UserProject.create({
    userId: user3.id,
    projectId: project1.id
  });

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
    majorRisks: "none",
    diversityAndInclusionConsiderations: 'Yes',
    investmentAppraisal: '30000',
    projectId: '1'
  });

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
    majorRisks: "none",
    diversityAndInclusionConsiderations: 'Yes',
    investmentAppraisal: '30000',
    projectId: '2'
  });

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
    majorRisks: "none",
    diversityAndInclusionConsiderations: 'Yes',
    investmentAppraisal: '30000',
    projectId: '3'
  });

  //--------------------------------------------------------------------------------------------------------------------
  // Add dummy business case to the database
  const businessCase4 = await BusinessCase.create({
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
    majorRisks: "none",
    diversityAndInclusionConsiderations: 'Yes',
    investmentAppraisal: '30000',
    projectId: '4'
  });

  const scoreboard1 = await Scoreboard.create({
    riskNarrative: 'The Risk Narrative',
    objectiveNarrative: 'The Objective Narrative',
    actionNarrative: 'The Action Narrative',
    projectId: '1'
  });

  const action1 = await Action.create({
    type: 'Late',
    scoreboardId: scoreboard1.id
  });
  const action2 = await Action.create({
    type: 'Late',
    scoreboardId: scoreboard1.id
  });

  const action3 = await Action.create({
    type: 'In Progress',
    scoreboardId: scoreboard1.id
  });
  const action4 = await Action.create({
    type: 'Not started',
    scoreboardId: scoreboard1.id
  });

  const action5 = await Action.create({
    type: 'Completed',
    scoreboardId: scoreboard1.id
  });

  const objective1 = await Objective.create({
    type: 'Not Met',
    scoreboardId: scoreboard1.id
  });
  const objective2 = await Objective.create({
    type: 'Met',
    scoreboardId: scoreboard1.id
  });
  const objective3 = await Objective.create({
    type: 'In Progress',
    scoreboardId: scoreboard1.id
  });

  const risk1 = await Risk.create({
    type: 'Critical',
    scoreboardId: scoreboard1.id
  });
  const risk2 = await Risk.create({
    type: 'Out Of Control',
    scoreboardId: scoreboard1.id
  });
  const risk3 = await Risk.create({
    type: 'In Control',
    scoreboardId: scoreboard1.id
  });

  const updater1 = await Updater.create({
    firstName: 'fn3',
    surname: 'sur3',
    email: 'test3@test.com',
    phoneNumber: '098765432101',
    keepMeUpdated: false
  });

  const updaterProject1 = await UpdaterProject.create({
    projectId: project1.id,
    updaterId: updater1.id
  });

  console.log('=========================================================');
  console.log('ADDITION OF DUMMY DATA COMPLETE!');
  console.log('=========================================================');
};

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

 sequelize
   .sync({ force: true }) // Only use this when changing tables or fields
   // .sync()
   .then(dummyData => {
     return populateDummyData(), createQuestionnaire();
   })
   .catch(err => console.log(err));
