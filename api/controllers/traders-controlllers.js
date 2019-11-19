const {
  selectAllTraders,
  selectTraderByUsername,
  updateTrader,
  addTrader
} = require('../models/traders-models');

exports.getAllTraders = (req, res, next) => {
  if (req.query.sort_by) req.query.order = 'asc';
  selectAllTraders(req.query).then(traders => {
    res.status(200).send({ traders });
  });
};

exports.getTraderByUsername = (req, res, next) => {
  selectTraderByUsername(req.params.username).then(trader => {
    res.status(200).send({ trader: trader[0] });
  });
};

exports.postNewTrader = (req, res, next) => {
  addTrader(req)
    .then(trader => {
      res.status(201).send({ trader });
    })
    .catch(next);
};

exports.patchTrader = (req, res, next) => {};
