const {
  selectAllTraders,
  selectTraderByUsername,
  updateTrader,
  addTrader
} = require('../models/traders-models');

exports.getAllTraders = (req, res, next) => {
  const { sort_by, trade, rate, distance, score, project_id } = req.query;
  let order;
  if (sort_by) order = 'asc';

  selectAllTraders(
    sort_by,
    order,
    trade,
    rate,
    distance,
    score,
    project_id
  ).then(traders => {
    res.status(200).send({ traders });
  });
};

exports.getTraderByUsername = (req, res, next) => {
  selectTraderByUsername(req.params.username).then(trader => {
    res.status(200).send({ trader: trader[0] });
  });
};

exports.postNewTrader = (req, res, next) => {};

exports.patchTrader = (req, res, next) => {};
