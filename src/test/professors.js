const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../server');

const { describe } = mocha;
const { beforeEach } = mocha;
const { after } = mocha;
const { it } = mocha;

const { should } = chai.should();
const { expect } = chai;

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

const Professor = require('../models/professor');
const User = require('../models/user');

describe('Professors', () => {
  const newProfessor = {
    first_name: 'Tristan',
    last_name: 'Thompson',
    classes: [],
  };
  const user = {
    username: 'studentstest',
    password: 'teststudents',
  };
  beforeEach((done) => {
    agent
      .post('/auth/sign-up')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(user)
      .then(() => {
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it('Should get all professors', (done) => {
    agent
      .get('/professors/')
      .then((res) => {
        expect(res).to.have.status(200);
        expect(res.body.professors).to.be.an('array');
        done();
      });
  });
  it('Should delete a professor', (done) => {
    agent
      .post('/professors/new')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send(newProfessor)
      .then((res) => agent
        .delete('/professors/5d6ede6a0ba62570arcedd3a/delete'))
      .then((res) => {
        expect(res).to.have.status(200);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  it('Should create a new professor', (done) => {
    Professor.estimatedDocumentCount()
      .then((initialDocCount) => {
        agent
          .post('/professors/new')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send(newProfessor)
          .then((res) => {
            Professor.estimatedDocumentCount()
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
    Professor.findOneAndDelete(newProfessor)
      .then(() => {
        User.findOneAndDelete({
          username: user.username,
        })
          .then(() => {
            agent.close();
            done();
          })
          .catch((err) => {
            done(err);
          });
      })
      .catch((err) => {
        done(err);
      });
  });
});
