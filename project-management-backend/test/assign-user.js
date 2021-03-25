const expect = require('chai').expect;
const { Sequelize } = require('sequelize');
const User = require('../models/user');
const Project = require('../models/project');
const UserController = require('../controllers/user');
const sql = require('../util/database');

describe('Assign User Controller', function () {
  before(function (done) {
    sql
      .sync()
      .then(result => {
        const project = new Project({
          name: 'My Dummy Project',
          managerName: 'Peter Parker',
          transformationLead: 'Matt Murdock',
          projectScore: '15',
          projectStatus: 'Active',
          projectSize: 'Large',
          quickWin: true,
          projectType: 'Dummy Project',
          questions: {}
        });
        return project.save();
      })
      .then(() => {
        done();
      })
      .catch(err => console.log(err));
  });

  beforeEach(function () {});

  afterEach(function () {});

  it('should send a response with a valid user status for an existing user', function (done) {
    const req = { body: { projectId: 1 } };
    const res = {
      statusCode: 500,
      projectUsers: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.projectUsers = data.users;
      }
    };

    UserController.getUserProjects(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      done();
    });
  });

  after(function (done) {
    Project.destroy({ where: {} }).then(() => {
      done();
    });
  });
});
