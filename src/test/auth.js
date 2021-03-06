const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../server');

const { describe } = mocha;
const { after } = mocha;
const { it } = mocha;
const { should } = chai.should();

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

const User = require('../models/user');

describe('User', () => {
  // login
  it('should not be able to login if they have not registered', (done) => {
    agent
      .post('/auth/login', { username: 'wrong@wrong.com', password: 'nope' })
      .end((err, res) => {
        res.status.should.be.equal(401);
        done();
      });
  });
  // signup
  it('should be able to signup', (done) => {
    User.findOneAndRemove({ username: 'testone' }, () => {
      agent
        .post('/auth/sign-up')
        .send({ username: 'testone', password: 'password' })
        .end((err, res) => {
          res.should.have.status(200);
          agent.should.have.cookie('nToken');
          done();
        });
    });
  });
  after(() => {
    agent.close();
  });
});
