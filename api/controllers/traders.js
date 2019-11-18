const {
  selectAllTraders,
  selectTraderByUsername,
  updateTrader,
  addTrader
} = require('../models/traders');

exports.getAllTraders = (req, res, next) => {
  selectAllTraders().then(traders => {
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
