const { connection } = require('../db/connection');
const { getDistances } = require('../utils');
const bcrypt = require('bcrypt');

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
    .select(
      'username',
      'first_name',
      'last_name',
      'lat',
      'lng',
      'personal_site',
      'trade',
      'rate',
      'avatar_ref',
      'dob',
      'score'
    )
    .from('traders')
    .where('traders.username', '=', username);
};

exports.addTrader = ({ body }) => {
  const trader = { ...body };
  trader.password = bcrypt.hashSync(trader.password, 10);
  return connection('traders')
    .insert(trader)
    .returning('*');
};

exports.updateTrader = (
  {
    first_name,
    last_name,
    lat,
    lng,
    personal_site,
    trade,
    rate,
    avatar_ref,
    dob
  },
  username
) => {
  return connection('traders')
    .where('username', '=', username)
    .modify(modifier => {
      if (first_name) modifier.update({ first_name }).returning('*');
      if (last_name) modifier.update({ last_name }).returning('*');
      if (lat) modifier.update({ lat }).returning('*');
      if (lng) modifier.update({ lng }).returning('*');
      if (personal_site) modifier.update({ personal_site }).returning('*');
      if (trade) modifier.update({ trade }).returning('*');
      if (avatar_ref) modifier.update({ avatar_ref }).returning('*');
      if (dob) modifier.update({ dob }).returning('*');
      if (rate) modifier.update({ rate }).returning('*');
    });
};
