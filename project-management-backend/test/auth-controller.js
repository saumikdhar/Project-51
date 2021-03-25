const expect = require('chai').expect;
const sinon = require('sinon');
const { Sequelize } = require('sequelize');
const User = require('../models/user');
const AuthController = require('../controllers/auth');
const sql = require('../util/database');

describe('Auth Controller', function () {
  before(function (done) {
    sql
      .sync()
      .then(result => {
        console.log('connection opened');
        const user = new User({
          email: 'test2@test.com',
          password: 'password',
          firstName: 'test',
          surname: '2',
          role: 'manager',
          id: 100
        });
        return user.save();
      })
      .then(() => {
        done();
      })
      .catch(err => console.log(err));
  });

  beforeEach(function () {});

  afterEach(function () {});

  it('should throw an error with code 500 if accessing the database fails', function (done) {
    sinon.stub(User, 'findOne');
    User.findOne.throws();

    const req = {
      body: {
        email: 'test2@test.com',
        password: 'password'
      }
    };

    AuthController.login(req, {}, () => {})
      .then(result => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        done();
      })
      .catch(err => console.log('caught the error', err));
    User.findOne.restore();
  });

  // it('should send a response with a valid user status for an existing user', async function (done) {
  //   const req = { email: 'test@test.com' };
  //   const res = {
  //     statusCode: 500,
  //     status: function (code) {
  //       this.statusCode = code;
  //       return this;
  //     }
  //   };
  //
  //   AuthController.login(req, res, () => {}).then(() => {
  //     expect(res.statusCode).to.be.equal(200);
  //     done();
  //   });
  // });

  after(function (done) {
    User.destroy({ where: {} })
      .then(() => {
        // Return sql.close().then(() => console.log('Connection to DB closed gracefully'));
        // Don't close sequelize connection as this connection is use recursively
      })
      .then(() => {
        done();
      });
  });
});
