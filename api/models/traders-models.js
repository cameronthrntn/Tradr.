const { connection } = require('../db/connection');

exports.selectAllTraders = (
  sort_by = 'score',
  order = 'desc',
  trade,
  rate,
  location,
  score
) => {
  return connection
    .select('*')
    .from('traders')
    .orderBy(sort_by, order)
    .modify(query => {
      if (trade) query.where('traders.trade', '=', trade);
      if (rate) query.where('traders.rate', '=', rate);
      if (score) query.where('traders.score', '=', score);
    })
    .returning('*');
};

exports.selectTraderByUsername = username => {
  return connection
    .select('*')
    .from('traders')
    .where('traders.username', '=', username)
    .returning('*');
};
