process.env.NODE_ENV = 'test';
const { app } = require('../app');
const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-sorted'));
const request = require('supertest');
const { connection } = require('../db/connection');

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe('/api', () => {
  describe('/traders', () => {
    describe('GET', () => {
      describe('OK', () => {
        it('Status 200: responds with array of trader objects', () => {
          return request(app)
            .get('/api/traders?project_id=1')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders.length).to.equal(3);
            });
        });
        it('Traders are sorted by score as a default in descending order', () => {
          return request(app)
            .get('/api/traders?project_id=1')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders).to.be.sortedBy('score', {
                descending: true
              });
            });
        });
        xit('when sorting query is distance, traders array is sorted by given distance in ascending order', () => {
          return request(app)
            .get('/api/traders?sort_by=distance&project_id=1')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders).to.be.sortedBy('distance', {
                descending: false
              });
            });
        });
        it('when sorting query is rate, traders array is sorted by given rate in ascending order', () => {
          return request(app)
            .get('/api/traders?sort_by=rate&project_id=1')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders).to.be.sortedBy('rate', {
                descending: false
              });
            });
        });
        it('traders array contains only those with given trade in query', () => {
          return request(app)
            .get('/api/traders?trade=plumber&project_id=1')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders.length).to.equal(1);
            });
        });
        it('traders array can be queried by score', () => {
          return request(app)
            .get('/api/traders?score=3.8&project_id=1')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders.length).to.equal(1);
            });
        });
        it('traders array can be queried by rate', () => {
          return request(app)
            .get('/api/traders?upper_rate=120&project_id=1')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders.length).to.equal(1);
            });
        });
      });
      describe('Error Handling', () => {});
    });
    describe('POST', () => {
      describe('OK', () => {
        it('Status 201: responds with created trader object', () => {
          return request(app)
            .post('/api/traders')
            .send({
              username: 'BobTheBuilder',
              first_name: 'Bob',
              last_name: 'The Builder',
              lng: 3.0357,
              lat: 53.8175,
              rate: 200,
              dob: '03/12/88',
              personal_site: 'www.google.com',
              trade: 'builder'
            })
            .then(({ body }) => {
              expect(body.trader[0]).to.contain.keys(
                'first_name',
                'last_name',
                'lng',
                'lat',
                'trade',
                'score',
                'rate',
                'avatar_ref',
                'dob',
                'personal_site'
              );
              expect(body.trader[0].username).to.equal('BobTheBuilder');
            });
        });
      });
      describe('Error Handling', () => {});
    });
    describe('/traders', () => {
      describe('PATCH', () => {
        it('responds with an updated trader object', () => {
          return request(app)
            .patch('/api/traders/fakeTrader')
            .send({
              first_name: 'new',
              last_name: 'name',
              lat: 1.1234,
              lng: -1.4321,
              personal_site: 'www.google.com',
              trade: 'Sparky',
              rate: 100,
              avatar_ref:
                'https://pickaface.net/gallery/avatar/unr_test_180612_1021_b05p.png',
              dob: '01/01/1985'
            })
            .expect(200)
            .then(({ body }) => {
              expect(body.trader[0]).to.eql({
                username: 'fakeTrader',
                score: 1.9,
                first_name: 'new',
                last_name: 'name',
                lat: 1.1234,
                lng: -1.4321,
                personal_site: 'www.google.com',
                trade: 'Sparky',
                rate: 100,
                avatar_ref:
                  'https://pickaface.net/gallery/avatar/unr_test_180612_1021_b05p.png',
                dob: '1985-01-01T00:00:00.000Z'
              });
            });
        });
      });
    });

    describe('/:username', () => {
      describe('GET', () => {
        describe('OK', () => {
          it('Status 200: responds with requested trader object', () => {
            return request(app)
              .get('/api/traders/kitlets')
              .expect(200)
              .then(({ body }) => {
                expect(body.trader.username).to.equal('kitlets');
              });
          });
        });
        describe('Error Handling', () => {});
      });
      xdescribe('PATCH', () => {
        describe('OK', () => {
          it('Status 200: responds with updated trader object', () => {
            return request(app)
              .patch('/api/traders/kitlet')
              .send({
                first_name: 'Russell',
                last_name: 'Brand',
                location: 'Essex (still)',
                personal_site: 'https://www.russellbrand.com/',
                trade: 'comedian'
              })
              .expect(200)
              .then(({ body: { trader } }) => {
                expect(trader).to.eql({
                  first_name: 'Russell',
                  last_name: 'Brand',
                  location: 'Essex (still)',
                  personal_site: 'https://www.russellbrand.com/',
                  trade: 'comedian',
                  dob: new Date('21/05/1984'),
                  score: 3.7,
                  lat: 53.795227,
                  long: -1.545038,
                  avatar_ref: 'api/db/data/test/Images/18889192-plumber.jpg',
                  rate: 230
                });
              });
          });
        });
        describe('Error Handling', () => {});
      });
    });
  });
  describe('/projects', () => {
    describe('GET', () => {
      it('Status 200: returns an array of project Objects containing specific keys', () => {
        return request(app)
          .get('/api/projects')
          .expect(200)
          .then(({ body }) => {
            expect(body.projects).to.be.an('array');
            expect(body.projects[0]).to.be.an('object');
            expect(body.projects[0]).to.contain.keys(
              'end_date',
              'lat',
              'lng',
              'project_id',
              'start_date',
              'status',
              'title',
              'username'
            );
          });
      });
      it('Status 200: returns an array of projects that are sorted in descending order by start date as default', () => {
        return request(app)
          .get('/api/projects')
          .expect(200)
          .then(({ body }) => {
            expect(body.projects).to.be.descendingBy('start_date');
          });
      });
      it('Status 200: returns an array of projects that are filtered by username', () => {
        return request(app)
          .get('/api/projects?username=By-Tor2114')
          .expect(200)
          .then(({ body }) => {
            expect(body.projects[0].username).to.equal('By-Tor2114');
          });
      });
      it('Status 200: returns an array of projects that are filtered by status', () => {
        return request(app)
          .get('/api/projects?status=in planning')
          .expect(200)
          .then(({ body }) => {
            expect(body.projects[0].status).to.equal('in planning');
          });
      });
    });
    describe('POST', () => {
      it('Status 201: responds with a created project object', () => {
        return request(app)
          .post('/api/projects')
          .send({
            lng: 53.795227,
            lat: -1.545038,
            username: 'By-Tor2114',
            title: 'swimming pool',
            start_date: '03/12/2020',
            end_date: '01/12/2021'
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.project[0].start_date).to.equal(
              '2020-12-03T00:00:00.000Z'
            );
            expect(body.project[0].end_date).to.equal(
              '2021-12-01T00:00:00.000Z'
            );
            expect(body.project[0].status).to.equal('in planning');
          });
      });
    });
    describe('PATCH', () => {
      it('Status 200: Returns an updated project object when supplied with new lng/lat details and an updated status', () => {
        return request(app)
          .patch('/api/projects/1')
          .send({
            lat: 11,
            lng: 22,
            status: 'in progress'
          })
          .expect(200)
          .then(({ body }) => {
            expect(body.project[0]).to.eql({
              lat: 11,
              lng: 22,
              status: 'in progress',
              username: 'By-Tor2114',
              title: "BJ's new bathroom",
              status: 'in progress',
              start_date: '2019-01-08T00:00:00.000Z',
              end_date: '2019-12-12T00:00:00.000Z',
              project_id: 1
            });
          });
      });
    });
    describe('/:id', () => {
      describe('GET', () => {
        it('Status 200: Returns a project by its ID', () => {
          return request(app)
            .get('/api/projects/1')
            .expect(200)
            .then(({ body }) => {
              expect(body.project[0].project_id).to.equal(1);
              expect(body.project[0].username).to.equal('By-Tor2114');
            });
        });
      });
      describe('/traders', () => {
        describe('GET', () => {
          it('Status 200: Returns an array of all traders linked to a project, along with relevant project information', () => {
            return request(app)
              .get('/api/projects/2/traders')
              .expect(200)
              .then(({ body }) => {
                expect(body.traders).to.be.an('array');
                expect(body.traders[0].trader_username).to.equal('Shubwub');
                expect(body.traders[1].trader_username).to.equal('kitlets');
                expect(body.traders.length).to.equal(2);
              });
          });
        });
      });
    });
    describe('POST', () => {
      it('Status 201: Post a trader to a project', () => {
        return request(app)
          .post('/api/projects/1/traders')
          .send({
            username: 'Shubwub'
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.project[0]).to.eql({
              trader_username: 'Shubwub',
              project_id: 1
            });
          });
      });
    });
  });
  describe('/users', () => {
    describe('POST', () => {
      it('Status 201: Creates a new user object and returns that object', () => {
        return request(app)
          .post('/api/users')
          .send({
            username: 'newUser',
            first_name: 'bobicus',
            last_name: 'buildicus',
            dob: '01/01/88'
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.user[0].username).to.equal('newUser');
            expect(body.user[0].avatar_ref).to.equal(
              'https://firebasestorage.googleapis.com/v0/b/tradr-4959b.appspot.com/o/images%2Fimage.jpeg?alt=media&token=6e64d204-8665-44f3-8fa7-fd7ad58d488d'
            );
          });
      });
    });
    describe('/:username', () => {
      describe('PATCH', () => {
        it('Status 200: Returns an updated user object when supplied a new first name', () => {
          return request(app)
            .patch('/api/users/By-Tor2114')
            .send({ first_name: 'Benji' })
            .expect(200)
            .then(({ body }) => {
              expect(body.user[0].first_name).to.equal('Benji');
            });
        });
        it('Status 200: Returns an updated user object when supplied a new last name', () => {
          return request(app)
            .patch('/api/users/By-Tor2114')
            .send({ last_name: 'Weitz' })
            .expect(200)
            .then(({ body }) => {
              expect(body.user[0].last_name).to.equal('Weitz');
            });
        });
        it('Status 200: Returns an updated user object when supplied a new avatar ref', () => {
          return request(app)
            .patch('/api/users/By-Tor2114')
            .send({ avatar_ref: 'www.google.com' })
            .expect(200)
            .then(({ body }) => {
              expect(body.user[0].avatar_ref).to.equal('www.google.com');
            });
        });
        it('Status 200: Returns an updated user object when supplied a new date of birth', () => {
          return request(app)
            .patch('/api/users/By-Tor2114')
            .send({ dob: '01/01/1985' })
            .expect(200)
            .then(({ body }) => {
              expect(body.user[0].dob).to.equal('1985-01-01T00:00:00.000Z');
            });
        });
      });
      describe('GET', () => {
        it('Status 200: Returns a user by username', () => {
          return request(app)
            .get('/api/users/By-Tor2114')
            .expect(200)
            .then(({ body }) => {
              expect(body.user[0]).to.eql({
                username: 'By-Tor2114',
                first_name: 'Ben',
                last_name: 'Jones',
                avatar_ref:
                  '/api/db/data/test/Images/stock-person-png-stock-photo-man-11563049686zqeb9zmqjd.png',
                dob: '1988-10-07T23:00:00.000Z'
              });
            });
        });
      });
    });
  });
  describe('/reviews', () => {
    describe('GET', () => {
      describe('OK', () => {
        it('Status 200: Returns an array of reviews by a given valid user', () => {
          return request(app)
            .get('/api/reviews?user_username=BenRut')
            .expect(200)
            .then(({ body }) => {
              expect(body.reviews[0].user_username).to.equal('BenRut');
            });
        });
        it('Status 200: Returns an array of reviews for a given trader', () => {
          return request(app)
            .get('/api/reviews?trader_username=kitlets')
            .expect(200)
            .then(({ body }) => {
              expect(body.reviews[0].trader_username).to.equal('kitlets');
            });
        });
        it('Status 200: Returns an array of reviews for a given trader and user', () => {
          return request(app)
            .get('/api/reviews?trader_username=kitlets&user_username=BenRut')
            .expect(200)
            .then(({ body }) => {
              expect(body.reviews[0].trader_username).to.equal('kitlets');
              expect(body.reviews[0].user_username).to.equal('BenRut');
            });
        });
        it('Status 200: Returns an empty array of reviews for a given trader with no reviews', () => {
          return request(app)
            .get('/api/reviews?trader_username=fakeTrader')
            .expect(200)
            .then(({ body }) => {
              expect(body.reviews.length).to.equal(0);
            });
        });
      });
    });
    describe('POST', () => {
      describe('OK', () => {
        it('Status 201: Returns a posted valid review', () => {
          return request(app)
            .post('/api/reviews')
            .send({
              user_username: 'By-Tor2114',
              trader_username: 'Shubwub',
              heading: 'this is a review',
              body: 'body here',
              score: 4
            })
            .expect(201)
            .then(({ body }) => {
              expect(body.review.user_username).to.equal('By-Tor2114');
            });
        });
        it('Status 201: The traders score is updated based on how the review affects their average score', () => {
          return request(app)
            .post('/api/reviews')
            .send({
              user_username: 'By-Tor2114',
              trader_username: 'kitlets',
              heading: 'this is a review',
              body: 'body here',
              score: 4
            })
            .then(() => {
              return request(app)
                .post('/api/reviews')
                .send({
                  user_username: 'BenRut',
                  trader_username: 'kitlets',
                  heading: 'this is a review',
                  body: 'body here',
                  score: 3
                });
            })
            .then(() => {
              return request(app).get('/api/traders/kitlets');
            })
            .then(({ body }) => {
              expect(body.trader.score).to.equal(3.5);
            });
        });
      });
      describe('Error Handling', () => {
        it('Status 404: Returns 404 for a user that doesnt exist', () => {
          return request(app)
            .post('/api/reviews')
            .send({
              user_username: 'notReal',
              trader_username: 'Shubwub',
              heading: 'this is a review',
              body: 'body here',
              score: 4
            })
            .expect(404);
        });
        it('Status 404: Returns 404 for a trader that doesnt exist', () => {
          return request(app)
            .post('/api/reviews')
            .send({
              user_username: 'BenRut',
              trader_username: 'notReal',
              heading: 'this is a review',
              body: 'body here',
              score: 4
            })
            .expect(404);
        });
      });
    });
  });
  describe('/requests', () => {
    describe('GET', () => {
      describe('OK', () => {
        it('Status 200: Returns a list of open requests from a user', () => {
          return request(app)
            .get('/api/requests?user_username=BenRut')
            .expect(200)
            .then(({ body }) => {
              expect(body.requests[0].user_username).to.equal('BenRut');
            });
        });
        it('Status 200: Returns a list of open requests to a trader', () => {
          return request(app)
            .get('/api/requests?trader_username=Shubwub')
            .expect(200)
            .then(({ body }) => {
              expect(body.requests[0].trader_username).to.equal('Shubwub');
            });
        });
      });
    });
    describe('POST', () => {
      describe('OK', () => {
        it('Status 201: Returns the posted request', () => {
          return request(app)
            .post('/api/requests')
            .send({
              user_username: 'By-Tor2114',
              trader_username: 'fakeTrader',
              project_id: 1
            })
            .expect(201)
            .then(({ body }) => {
              expect(body.request.user_username).to.equal('By-Tor2114');
            });
        });
        it('Status 200: A new request can be found on the users list', () => {
          return request(app)
            .post('/api/requests')
            .send({
              user_username: 'By-Tor2114',
              trader_username: 'fakeTrader',
              project_id: 1
            })
            .then(({ body }) => {
              return request(app)
                .get('/api/requests?user_username=By-Tor2114')
                .expect(200)
                .then(({ body }) => {
                  expect(body.requests.length).to.equal(2);
                });
            });
        });
        it('Status 200: A new request can be found on the traders list', () => {
          return request(app)
            .post('/api/requests')
            .send({
              user_username: 'By-Tor2114',
              trader_username: 'fakeTrader',
              project_id: 1
            })
            .then(() => {
              return request(app)
                .get('/api/requests?trader_username=fakeTrader')
                .expect(200)
                .then(({ body }) => {
                  expect(body.requests.length).to.equal(2);
                });
            });
        });
      });
      describe('Error Handling', () => {
        it('Status 400: Should not allow a request to a trader already on a project', () => {
          return request(app)
            .post('/api/requests')
            .send({
              user_username: 'BenRut',
              trader_username: 'kitlets',
              project_id: 2
            })
            .expect(400);
        });
        it('Status 400: Should not allow a request to a trader with an open request for that project', () => {
          return request(app)
            .post('/api/requests')
            .send({
              user_username: 'By-Tor2114',
              trader_username: 'Shubwub',
              project_id: 1
            })
            .expect(400);
        });
        it('Status 400: Should not allow a request for a project the user does not own', () => {
          return request(app)
            .post('/api/requests')
            .send({
              user_username: 'By-Tor2114',
              trader_username: 'fakeTrader',
              project_id: 2
            })
            .expect(400);
        });
      });
    });
    describe('DELETE', () => {
      describe('OK', () => {
        it('Status 200: Returns the number of deleted requests (1)', () => {
          return request(app)
            .del('/api/requests?request_id=1&a=true&')
            .expect(200)
            .then(({ body }) => {
              expect(body.rows).to.equal(1);
            });
        });
      });
      describe('Error Handling', () => {
        it('Status 404: Returns 404 for a request that doesnt exist', () => {
          return request(app)
            .del('/api/requests?request_id=19&a=true&')
            .expect(404)
        });
      });
    });
  });
});
