const requestsRouter = require('express').Router();
const {
  getRequests,
  postRequest
  // deleteRequest
} = require('../controllers/requests-controllers');
const { handle405s } = require('../errors');

requestsRouter
  .route('/')
  .get(getRequests)
  .post(postRequest)
  // .delete(deleteRequest)
  .all(handle405s);

module.exports = requestsRouter;
