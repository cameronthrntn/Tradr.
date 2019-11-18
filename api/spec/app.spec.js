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
  xdescribe('/traders', () => {
    describe('GET', () => {
      describe('OK', () => {
        it.only('Status 200: responds with array of trader objects', () => {
          return request(app)
            .get('/api/traders?project_id=1')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders.length).to.equal(3);
            });
        });
        it('Traders are sorted by score as a default in descending order', () => {
          return request(app)
            .get('/api/traders')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders).to.be.sortedBy('score', {
                descending: true
              });
            });
        });
        xit('when sorting query is distance, articles array is sorted by given distance in ascending order', () => {
          return request(app)
            .get('/api/traders?sort_by=distance')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.be.sortedBy('distance', {
                descending: false
              });
            });
        });
        it('when sorting query is rate, articles array is sorted by given rate in ascending order', () => {
          return request(app)
            .get('/api/traders?sort_by=rate')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders).to.be.sortedBy('rate', {
                descending: false
              });
            });
        });
        it('traders array contains only those with given trade in query', () => {
          return request(app)
            .get('/api/traders?trade=plumber')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders.length).to.equal(1);
            });
        });
        it('traders array can be quiered by score', () => {
          return request(app)
            .get('/api/traders?score=3.8')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders.length).to.equal(1);
            });
        });
        it('traders array can be quiered by rate', () => {
          return request(app)
            .get('/api/traders?rate=120')
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
              logitude: 3.0357,
              latitude: 53.8175,
              trade: 'builder'
            })
            .then(({ body }) => {
              expect(body.trader).to.contain.keys(
                'username',
                'password',
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
              expect(body.trader.username).to.equal('BobTheBuilder');
            });
        });
      });
      describe('Error Handling', () => {});
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
      describe('PATCH', () => {
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
          .get('/api/projects?status=in progress')
          .expect(200)
          .then(({ body }) => {
            expect(body.projects[0].status).to.equal('in progress');
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
            expect(body.project[0].status).to.equal('in progress');
          });
      });
    });
  });
});
