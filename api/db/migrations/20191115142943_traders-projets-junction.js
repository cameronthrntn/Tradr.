exports.up = function(knex) {
  return knex.schema.createTable(
    'traders-projects-junction',
    tradersProjectsJunction => {
      tradersProjectsJunction
        .string('trader_username')
        .references('traders.username');
    }
  );
};

exports.down = function(knex) {};
