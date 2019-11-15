process.env.NODE_ENV = 'test';
const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
// chai.use(require('chai-sorted'));
const request = require('supertest');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe('/api', () => {
  describe('traders', () => {
    describe('GET', () => {
      describe(':)', () => {
        it('responds with status 200 and array of trader objects', () => {
          return request(app)
            .get('/api/traders')
            .expect(200)
            .then(({ body }) => {
              expect(body.traders).length.to.equal(3);
              expect(body.traders[0].username).to.equal('kitlets');
            });
        });
      });
      describe(':(', () => {});
    });
    describe('POST', () => {
      describe(':)', () => {
        it('responds with status 201 and created trader object', () => {
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
                'first_name',
                'last_name',
                'longitude',
                'latitude',
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
      describe(':(', () => {});
    });
    describe('/:username', () => {
      describe('GET', () => {
        describe(':)', () => {
          it('responds with status 200 and requested trader object', () => {
            return request(app)
              .get('/api/traders/kitlets')
              .expect(200)
              .then(({ body }) => {
                expect(body.trader.username).to.equal('kitlets');
              });
          });
        });
        describe(':(', () => {});
      });
      describe('PATCH', () => {
        describe(':)', () => {
          it('responds with status 200 and updated trader object', () => {
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
        describe(':(', () => {});
      });
    });
  });
});
