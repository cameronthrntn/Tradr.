const { connection } = require('../db/connection');
const { getDistances } = require('../utils');

exports.selectAllTraders = async ({
  sort_by = 'score',
  order = 'desc',
  trade,
  lower_rate,
  upper_rate,
  distance = 20,
  score,
  project_id
}) => {
  let traders = await connection
    .select('*')
    .from('traders')
    .orderBy(sort_by, order)
    .modify(query => {
      if (trade) query.where('traders.trade', '=', trade);
      if (lower_rate) query.where('traders.rate', '>=', lower_rate);
      if (upper_rate) query.where('traders.rate', '<=', upper_rate);
      if (score) query.where('traders.score', '>=', score);
    });
  const project = await connection
    .select('lat', 'lng')
    .from('projects')
    .where('projects.project_id', '=', project_id);
  traders = getDistances(project[0], traders).filter(
    trader => trader.distance <= distance
  );

  return traders;
};

exports.selectTraderByUsername = username => {
  return connection
    .select('*')
    .from('traders')
    .where('traders.username', '=', username);
};

exports.addTrader = ({ body }) => {
  return connection('traders')
    .insert(body)
    .returning('*');
};
