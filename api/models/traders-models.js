const { connection } = require('../db/connection');

exports.selectAllTraders = (
  sort_by = 'score',
  order = 'desc',
  trade,
  rate,
  distance,
  score,
  project_id
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
    .then(traders => {
      if (distance) {
        return connection
          .select('lat', 'lng')
          .from('projects')
          .where('projects.project_id', '=', project_id);
      }
    })
    .then(stuff => {
      console.log(stuff.project, stuff.traders.length);
    });
};

exports.selectTraderByUsername = username => {
  return connection
    .select('*')
    .from('traders')
    .where('traders.username', '=', username);
};
