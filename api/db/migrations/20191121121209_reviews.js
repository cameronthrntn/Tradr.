exports.up = function(knex) {
  return knex.schema.createTable('reviews', reviewsTable => {
    reviewsTable.increments('review_id').primary();
    reviewsTable.string('user_username').references('users.username');
    reviewsTable.string('trader_username').references('traders.username');
    reviewsTable.string('heading').notNullable();
    reviewsTable.string('body').notNullable();
    reviewsTable.integer('score').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reviews');
};
