const { fetchReviews, insertReview } = require('../models/reviews-models');

exports.postReview = (req, res, next) => {
  insertReview(req.body)
    .then(([review]) => {
      res.status(201).send({ review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  fetchReviews(req.query)
    .then(reviews => {
      res.send({ reviews });
    })
    .catch(next);
};
