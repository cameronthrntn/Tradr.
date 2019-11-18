const { connection } = require('../db/connection');

exports.selectAllTraders = (sort_by = 'score', order = 'desc') => {
  return connection
    .select('*')
    .from('traders')
    .orderBy(sort_by, order)
    .returning('*');
};

exports.selectTraderByUsername = username => {
  return connection
    .select('*')
    .from('traders')
    .where('traders.username', '=', username)
    .returning('*');
};
