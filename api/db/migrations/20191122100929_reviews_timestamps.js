exports.up = function(knex) {
  return knex.schema.table('reviews', table => {
    table.timestamp('posted').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.table('reviews', table => {
    table.dropColumn('posted');
  });
};
