const { connection } = require('../db/connection');

exports.fetchReviews = ({ user_username, trader_username }) => {
  return connection('reviews').modify(query => {
    if (user_username) query.where({ user_username });
    if (trader_username) query.where({ trader_username });
  });
};

exports.insertReview = async body => {
  return connection('reviews')
    .insert(body)
    .returning('*');
};
