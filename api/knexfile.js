const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'test';
const creds = ENV === 'production' ? null : require('./db/config');
const { key } = require('./secretkey');

const baseConfig = {
  client: 'pg',
  JWT_SECRET: key,
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  development: {
    connection: {
      database: 'tradr',
      ...creds
    }
  },
  test: {
    connection: {
      database: 'tradr_test',
      ...creds
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
