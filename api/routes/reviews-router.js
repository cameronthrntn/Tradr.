const reviewsRouter = require('express').Router();
const { getReviews, postReview } = require('../controllers/reviews-controller');
const { handle405s } = require('../errors');

reviewsRouter
  .route('/')
  .get(getReviews)
  .post(postReview)
  .all(handle405s);

module.exports = reviewsRouter;
