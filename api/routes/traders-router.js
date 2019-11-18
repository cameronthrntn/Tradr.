const tradersRouter = require('express').Router();
const {
  postNewTrader,
  patchTrader,
  getAllTraders,
  getTraderByUsername
} = require('../controllers/traders');
const { handle405s } = require('../errors');

tradersRouter
  .route('/')
  .get(getAllTraders)
  .post(postNewTrader)
  .all(handle405s);

tradersRouter
  .route('/:username')
  .get(getTraderByUsername)
  .patch(patchTrader)
  .all(handle405s);

module.exports = tradersRouter;
