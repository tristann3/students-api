const chai = require('chai');
const mocha = require('mocha');
const chaiHttp = require('chai-http');
const server = require('../server');

const { describe } = mocha;
const { before } = mocha;
const { after } = mocha;
const { it } = mocha;

const { expect } = chai;

chai.use(chaiHttp);

// Agent that will keep track of our cookies
const agent = chai.request.agent(server);

const Student = require('../models/student');
const User = require('../models/user');

describe('Students', () => {
  // Student that we'll use for testing purposes
  const newStudent = {
    first_name: 'Tristan',
    last_name: 'Thompson',
  };
  const user = {
    username: 'studentstest',
    password: 'teststudents',
  };
  before((done) => {
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
  it('Should create with valid attributes at POST /students/new', (done) => {
    // Checks how many students there are now
    Student.estimatedDocumentCount()
      .then((initialDocCount) => {
        agent
          .post('/students/new')
          // This line fakes a form post,
          // since we're not actually filling out a form
          .set('content-type', 'application/x-www-form-urlencoded')
          // Make a request to create another
          .send(newStudent)
          .then((res) => {
            Student.estimatedDocumentCount()
              .then((newDocCount) => {
                // Check that the status code is OK
                expect(res).to.have.status(200);
                // Check that the database has one more post in it
                expect(newDocCount).to.be.equal(initialDocCount + 1);
                // Check that the body is an object
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
  // login
  it('should be able to login', (done) => {
    agent
      .post('/auth/login')
      .send({ username: 'studentstest', password: 'teststudents' })
      .end((err, res) => {
        res.should.have.status(200);
        agent.should.have.cookie('nToken');
        done();
      });
  });
  // logout
  it('should be able to logout', (done) => {
    agent.get('/auth/logout').end((err, res) => {
      res.should.have.status(200);
      agent.should.not.have.cookie('nToken');
      done();
    });
  });
  after((done) => {
    Student.findOneAndDelete(newStudent)
      .then(() => {
        agent.close();

        User.findOneAndDelete({
          username: user.username,
        })
          .then(() => {
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
