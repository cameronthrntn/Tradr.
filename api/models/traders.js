const { connection } = require('../db/connection');

exports.selectAllTraders = () => {
  return connection
    .select('*')
    .from('traders')
    .returning('*');
};

exports.selectTraderByUsername = username => {
  return connection
    .select('*')
    .from('traders')
    .where('traders.username', '=', username)
    .returning('*');
};
