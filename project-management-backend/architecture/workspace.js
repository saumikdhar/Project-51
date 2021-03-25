const Workspace = require('structurizr-typescript').Workspace;
const CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy = require('structurizr-typescript')
  .CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy;
const Location = require('structurizr-typescript').Location;
const ElementStyle = require('structurizr-typescript').ElementStyle;
const Tags = require('structurizr-typescript').Tags;
const Shape = require('structurizr-typescript').Shape;

const WEB_BROWSER_TAG = 'Web Browser';
const DATABASE_TAG = 'Database';
const DIRECTORY_TAG = 'Directory';

const workspace = new Workspace(
  'Project Management Architecture',
  'The architecture of the Project Management application.'
);
const model = workspace.model;
model.impliedRelationshipsStrategy = new CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy();
const viewSet = workspace.views;

// Create the context diagram...

// Create the system.
const projectManagement = model.addSoftwareSystem(
  'Project Management',
  'Application to submit and manage projects, and apply changes across the business.',
  Location.Internal
);

// The transformation team (admin) persona.
const transformationTeam = model.addPerson(
  'Transformation Team',
  'The team that assigns projects to managers and has similar role to admin.',
  Location.External
);

// The manager persona.
const manager = model.addPerson(
  'Manager',
  'The user that overviews/manages projects.',
  Location.External
);

// The employee persona.
const employee = model.addPerson(
  'Employee',
  'The user that works on large projects.',
  Location.External
);

// The IT department persona.
const itDepartment = model.addPerson(
  'IT Department',
  'The department that works on Simplify (small) projects that have quickWin.',
  Location.External
);

// The user persona.
const user = model.addPerson(
  'User',
  'The person from across the business such as a care worker.',
  Location.External
);

transformationTeam.uses(projectManagement, 'Uses');
manager.uses(projectManagement, 'Uses');
employee.uses(projectManagement, 'Uses');
itDepartment.uses(projectManagement, 'Uses');
user.uses(projectManagement, 'Uses');

// Create external dependencies.
const contextView = viewSet.createSystemContextView(
  projectManagement,
  'context',
  'The System Context diagram for the Project Management Framework project.'
);
contextView.addAllSoftwareSystems();
contextView.addAllPeople();
contextView.setAutomaticLayout(true);

// Create the container diagram...

const webApplication = projectManagement.addContainer(
  'Web Application',
  'Delivers the static content and the project management single page application.',
  'MySQL, Express, React, Node.js'
);

const architectureModel = projectManagement.addContainer(
  'C4 Model',
  'All of the diagrams created to show the architecture of the application and its contributors.',
  'Structurizr'
);

const workingAgreement = projectManagement.addContainer(
  'Working Agreement',
  'Guidelines developed as to how the team must work together to create a positive, productive process.',
  'Agile'
);

const pipeline = projectManagement.addContainer(
  'CI/CD Pipeline',
  'Pipeline to build, test, and deploy the application.',
  'GitLab CI/CD'
);

const documentation = projectManagement.addContainer(
  'Documentation',
  'The documentation of the application.',
  'README'
);

const testing = projectManagement.addContainer(
  'Automated Tests',
  'Tests to prove the system works as expected, and to find faults and/or risks within it.',
  'Frontend: Jest, Enzyme || Backend: Mocha, Chai, Sinon'
);

const singlePageApplication = projectManagement.addContainer(
  'Single-Page Application',
  'Displays and manages projects and users assigned to it.',
  'JavaScript and React'
);
singlePageApplication.tags.add(WEB_BROWSER_TAG);

const apiApplication = projectManagement.addContainer(
  'API Application',
  'Provides data to render the project data as JSON, and also handles other HTTP request methods.',
  'JavaScript and Node.js/Express'
);

const database = projectManagement.addContainer(
  'Database',
  'Stores the project data.',
  'MySQL, AWS RDS'
);
database.tags.add(DATABASE_TAG);

transformationTeam.uses(singlePageApplication, 'Uses', 'HTTPS');
manager.uses(singlePageApplication, 'Uses', 'HTTPS');
employee.uses(singlePageApplication, 'Uses', 'HTTPS');
itDepartment.uses(singlePageApplication, 'Uses', 'HTTPS');
user.uses(singlePageApplication, 'Uses', 'HTTPS');

webApplication.uses(architectureModel, 'Has artifact');
webApplication.uses(workingAgreement, 'Has artifact');
webApplication.uses(pipeline, 'Has artifact');
webApplication.uses(documentation, 'Has artifact');
webApplication.uses(testing, 'Has artifact');
webApplication.uses(singlePageApplication, "Delivers to the users's web browser", '');
singlePageApplication.uses(apiApplication, 'Makes API calls to', 'JSON/HTTPS');
apiApplication.uses(database, 'Reads from and writes to', 'Sequelize');

// Create the view.
const containerView = viewSet.createContainerView(
  projectManagement,
  'Containers',
  'The containers diagram for the Workforce Planning application.'
);
containerView.addAllPeople();
containerView.addAllContainers();
containerView.setAutomaticLayout(true);

// Add components...

const backendAppJs = apiApplication.addComponent(
  'app.js',
  'Sets the body parser to extract body portion of an incoming request. Sets the appropriate headers to avoid CORS issues. Handles routes. Error handling middleware. Connects to the MySQL database in AWS RDS.',
  'Express Middleware'
);

const authRoute = apiApplication.addComponent(
  'routes/auth.js',
  'Maps the routes to the appropriate method in the controller.'
);

const businessCaseRoute = apiApplication.addComponent(
  'routes/businessCase.js',
  'Maps the routes to the appropriate method in the controller.'
);

const projectRoute = apiApplication.addComponent(
  'routes/projects.js',
  'Maps the routes to the appropriate method in the controller.'
);

const scoreboardRoute = apiApplication.addComponent(
  'routes/scoreboard.js',
  'Maps the routes to the appropriate method in the controller.'
);

const userRoute = apiApplication.addComponent(
  'routes/user.js',
  'Maps the routes to the appropriate method in the controller.'
);

const authController = apiApplication.addComponent(
  'controllers/auth.js',
  'Handles the different HTTP request methods.'
);

const businessCaseController = apiApplication.addComponent(
  'controllers/businessCase.js',
  'Handles the different HTTP request methods.'
);

const projectController = apiApplication.addComponent(
  'controllers/projects.js',
  'Handles the different HTTP request methods.'
);

const scoreboardController = apiApplication.addComponent(
  'controllers/scoreboard.js',
  'Handles the different HTTP request methods.'
);

const userController = apiApplication.addComponent(
  'controllers/user.js',
  'Handles the different HTTP request methods.'
);

const addProjectController = apiApplication.addComponent(
  'controllers/addProject.js',
  'Handles the different HTTP request methods.'
);

const userModel = apiApplication.addComponent('models/user.js', 'Database schema for the user.');

const userProjectModel = apiApplication.addComponent(
  'models/user-project.js',
  'Database schema for link table between user and project.'
);

const projectModel = apiApplication.addComponent(
  'models/project.js',
  'Database schema for the project.'
);

const businessCaseModel = apiApplication.addComponent(
  'models/business-case.js',
  'Database schema for the business case.'
);

const scoreboardModel = apiApplication.addComponent(
  'models/scoreboard.js',
  'Database schema for the scoreboard in project.'
);

const riskModel = apiApplication.addComponent(
  'models/risk.js',
  'Database schema for the risk in scoreboard.'
);

const objectiveModel = apiApplication.addComponent(
  'models/objective.js',
  'Database schema for the objective in scoreboard.'
);

const actionModel = apiApplication.addComponent(
  'models/action.js',
  'Database schema for the action in scoreboard.'
);

const updaterModel = apiApplication.addComponent(
  'models/updater.js',
  'Database schema for the creator of the project.'
);

const updaterProjectModel = apiApplication.addComponent(
  'models/updater-project.js',
  'Database schema for link between updater and project.'
);

const questionnaireModel = apiApplication.addComponent(
  'models/questionnaire.js',
  'Database schema for link between updater and project.'
);

backendAppJs.uses(authRoute, 'Makes calls to');
backendAppJs.uses(businessCaseRoute, 'Makes calls to');
backendAppJs.uses(projectRoute, 'Makes calls to');
backendAppJs.uses(scoreboardRoute, 'Makes calls to');
backendAppJs.uses(userRoute, 'Makes calls to');

authRoute.uses(authController, 'Makes calls to');
businessCaseRoute.uses(businessCaseController, 'Makes calls to');
projectRoute.uses(projectController, 'Makes calls to');
projectRoute.uses(addProjectController, 'Makes calls to');
scoreboardRoute.uses(scoreboardController, 'Makes calls to');
userRoute.uses(userController, 'Makes calls to');

authController.uses(userModel, 'Uses');
businessCaseController.uses(businessCaseModel, 'Uses');
projectController.uses(userModel, 'Uses');
projectController.uses(projectModel, 'Uses');
projectController.uses(updaterModel, 'Uses');
addProjectController.uses(questionnaireModel, 'Uses');

scoreboardController.uses(scoreboardModel, 'Uses');
scoreboardController.uses(actionModel, 'Uses');
scoreboardController.uses(riskModel, 'Uses');
scoreboardController.uses(objectiveModel, 'Uses');

userController.uses(userModel, 'Uses');
userController.uses(userProjectModel, 'Uses');
userController.uses(projectModel, 'Uses');

const publicDirectory = singlePageApplication.addComponent(
  'public directory',
  'Includes index.html and favicon.ico files which were modified.',
  '',
  'HTML/CSS'
);
publicDirectory.tags.add(DIRECTORY_TAG);
const frontendIndex = singlePageApplication.addComponent(
  'index.js & index.css',
  'Initialises the app along with using Redux.',
  '',
  'React.js & CSS'
);
const frontendAppJs = singlePageApplication.addComponent(
  'App.js',
  'Sets the routing.',
  '',
  'React.js'
);
const frontendLayoutDirectory = singlePageApplication.addComponent(
  'hoc/Layout',
  'Higher-order component which sets the layout i.e. the design/structure of the application.',
  '',
  'React.js & CSS'
);
frontendLayoutDirectory.tags.add(DIRECTORY_TAG);
const logoDirectory = singlePageApplication.addComponent(
  'components/Logo',
  'Logo component used for the BT logo.',
  '',
  'React.js & CSS'
);
logoDirectory.tags.add(DIRECTORY_TAG);
const navigationDirectory = singlePageApplication.addComponent(
  'components/Navigation',
  'Navigation bar, and the side drawer.',
  '',
  'React.js & CSS'
);
navigationDirectory.tags.add(DIRECTORY_TAG);
const uiDirectory = singlePageApplication.addComponent(
  'components/UI',
  'UI components such as Backdrop and Spinner.',
  '',
  'React.js & CSS'
);
uiDirectory.tags.add(DIRECTORY_TAG);

const assignUsersDirectory = singlePageApplication.addComponent(
  'containers/AssignUsers',
  'Container that assigns users to project.',
  '',
  'React.js & CSS'
);
assignUsersDirectory.tags.add(DIRECTORY_TAG);
const authDirectory = singlePageApplication.addComponent(
  'containers/Auth',
  'Container that checks user authentication.',
  '',
  'React.js & CSS'
);
authDirectory.tags.add(DIRECTORY_TAG);

const createProjectDirectory = singlePageApplication.addComponent(
  'containers/createProject',
  'Container that creates a project.',
  '',
  'React.js & CSS'
);
createProjectDirectory.tags.add(DIRECTORY_TAG);

const userDirectory = singlePageApplication.addComponent(
  'containers/Users',
  'Container that manages uses (edit/add/delete).',
  '',
  'React.js & CSS'
);
userDirectory.tags.add(DIRECTORY_TAG);

const businessCaseDirectory = singlePageApplication.addComponent(
  'containers/BusinessCase',
  'Container that shows business case.',
  '',
  'React.js & CSS'
);
businessCaseDirectory.tags.add(DIRECTORY_TAG);
const projectDirectory = singlePageApplication.addComponent(
  'containers/Projects',
  'Container that shows list of projects.',
  '',
  'React.js & CSS'
);
projectDirectory.tags.add(DIRECTORY_TAG);
const projectDashDirectory = singlePageApplication.addComponent(
  'containers/ProjectDash',
  'Container that shows all projects for a manager/admin.',
  '',
  'React.js & CSS'
);
projectDashDirectory.tags.add(DIRECTORY_TAG);
const projectInfoDirectory = singlePageApplication.addComponent(
  'containers/ProjectInfo',
  'Container that shows more information of a project.',
  '',
  'React.js & CSS'
);
projectInfoDirectory.tags.add(DIRECTORY_TAG);
const scoreboardDirectory = singlePageApplication.addComponent(
  'containers/Scoreboard',
  'Container that shows project scoreboard.',
  '',
  'React.js & CSS'
);
scoreboardDirectory.tags.add(DIRECTORY_TAG);
const editProjectDirectory = singlePageApplication.addComponent(
  'containers/EditProject',
  'Container that allows the manager/Transformation team to edit a project.',
  '',
  'React.js & CSS'
);
editProjectDirectory.tags.add(DIRECTORY_TAG);

const reduxStore = singlePageApplication.addComponent('store', 'Points to.', '', 'React.js');
const utilityJs = singlePageApplication.addComponent('utility.js', 'Points to.', '', 'React.js');

publicDirectory.uses(frontendIndex, 'Uses');
frontendIndex.uses(frontendAppJs, 'Uses');
frontendAppJs.uses(frontendLayoutDirectory, 'Uses');
frontendLayoutDirectory.uses(navigationDirectory, 'Uses');
navigationDirectory.uses(logoDirectory, 'Uses');
navigationDirectory.uses(uiDirectory, 'Uses');

frontendAppJs.uses(assignUsersDirectory, 'Contains route to');
frontendAppJs.uses(authDirectory, 'Contains route to');
frontendAppJs.uses(projectDirectory, 'Contains route to');
frontendAppJs.uses(projectInfoDirectory, 'Contains route to');
frontendAppJs.uses(projectDashDirectory, 'Contains route to');
frontendAppJs.uses(scoreboardDirectory, 'Contains route to');
frontendAppJs.uses(businessCaseDirectory, 'Contains route to');
frontendAppJs.uses(createProjectDirectory, 'Contains route to');
frontendAppJs.uses(userDirectory, 'Contains route to');
frontendAppJs.uses(editProjectDirectory, 'Contains route to');

authDirectory.uses(reduxStore, 'Uses');
assignUsersDirectory.uses(reduxStore, 'Uses');
projectDirectory.uses(reduxStore, 'Uses');
projectDashDirectory.uses(utilityJs, 'Uses');
projectInfoDirectory.uses(utilityJs, 'Uses');
userDirectory.uses(utilityJs, 'Uses');
businessCaseDirectory.uses(utilityJs, 'Uses');
createProjectDirectory.uses(utilityJs, 'Uses');
scoreboardDirectory.uses(reduxStore, 'Uses');

reduxStore.uses(utilityJs, 'Uses');

const backendComponentView = viewSet.createComponentView(
  apiApplication,
  'Backend Components',
  'The component diagram for the backend/API application.'
);
backendComponentView.addAllComponents();
backendComponentView.setAutomaticLayout(true);
const frontendComponentView = viewSet.createComponentView(
  singlePageApplication,
  'Frontend Components',
  'The component diagram for the frontend/single-page application.'
);
frontendComponentView.addAllComponents();
frontendComponentView.setAutomaticLayout(true); // TODO: this sets the layout automatically

// Link the backend/API architecture model with the code.
apiApplication.components.map(component => {
  component.codeElements.map(codeElement => {
    const sourcePath = codeElement.url;
    if (sourcePath !== null) {
      codeElement.url =
        'https://git.cardiff.ac.uk/c1824227/project-51/-/tree/master/project-management-backend';
    }
  });
});

const style1 = new ElementStyle(Tags.SoftwareSystem);
style1.background = '#1168bd';
style1.color = '#ffffff';
const style2 = new ElementStyle(Tags.Container);
style2.background = '#438dd5';
style2.color = '#ffffff';
const style3 = new ElementStyle(Tags.Component);
style3.background = '#85bbf0';
style3.color = '#000000';
const style4 = new ElementStyle(Tags.Person);
style4.background = '#08427b';
style4.color = '#ffffff';
style4.shape = Shape.Person;
style4.fontSize = 22;
const style5 = new ElementStyle(WEB_BROWSER_TAG);
style5.shape = Shape.WebBrowser;
const style6 = new ElementStyle(DATABASE_TAG);
style6.shape = Shape.Cylinder;
const style7 = new ElementStyle(DIRECTORY_TAG);
style7.shape = Shape.Folder;

const styles = viewSet.configuration.styles;

styles.addElementStyle(style1);
styles.addElementStyle(style2);
styles.addElementStyle(style3);
styles.addElementStyle(style4);
styles.addElementStyle(style5);
styles.addElementStyle(style6);
styles.addElementStyle(style7);

module.exports = workspace;
