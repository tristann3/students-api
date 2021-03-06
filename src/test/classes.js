const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../server');

const { describe } = mocha;
const { beforeEach } = mocha;
const { after } = mocha;
const { it } = mocha;

const { expect } = chai;

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

const Class = require('../models/class');
const Professor = require('../models/professor');
const User = require('../models/user');

const newProfessor = {
  _id: '5d6ede6a0ba62570afcedd3a',
  first_name: 'Tristan',
  last_name: 'Thompson',
  classes: [],
};
const newClass = {
  name: 'BEW 1.2',
  professor: '5d6ede6a0ba62570afcedd3a',
};
const user = {
  username: 'studentstest',
  password: 'teststudents',
};

describe('Classes', () => {
  beforeEach((done) => {
    agent
      .post('/auth/sign-up')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(user)
      .then(() => agent
        .post('/professors/new')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(newProfessor))
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it('Should get all classes', (done) => {
    agent
      .get('/classes')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
  it('Should create a new Class at POST classes/new', (done) => {
    Class.estimatedDocumentCount()
      .then((initialDocCount) => {
        agent
          .post('/classes/new')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(newClass)
          .then((res) => {
            Class.estimatedDocumentCount()
              .then((newDocCount) => {
                expect(res).to.have.status(200);
                expect(newDocCount).to.be.equal(initialDocCount + 1);
                expect(res.body).to.be.an('object');
                done();
              })
              .catch((err) => {
                done(err);
              });
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });
  after((done) => {
    Class.findOneAndDelete(newClass)
      .then(() => User.findOneAndDelete({
        username: user.username,
      }))
      .then(() => Professor.findOneAndDelete(newProfessor)).then(() => {
        agent.close();
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
