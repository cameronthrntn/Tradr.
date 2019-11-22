const { connection } = require('../db/connection');

exports.fetchReviews = ({ user_username, trader_username }) => {
  return connection('reviews').modify(query => {
    if (user_username) query.where({ user_username });
    if (trader_username) query.where({ trader_username });
  });
};

exports.insertReview = async body => {
  const review = await connection('reviews')
    .insert(body)
    .returning('*');
  const review_data = await connection('reviews')
    .count('review_id')
    .sum('reviews.score')
    .join('traders', 'reviews.trader_username', 'traders.username')
    .where('traders.username', review[0].trader_username);
  const score = Number(review_data[0].sum) / Number(review_data[0].count);
  await connection('traders')
    .where('username', review[0].trader_username)
    .update({ score });
  return review;
};
