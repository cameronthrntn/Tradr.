const ENV = process.env.NODE_ENV || 'development';
// const devData = require('./dev');
const testData = require('./test');

const data = {
  development: devData,
  test: testData,
  production: devData
};

module.exports = data.test;
