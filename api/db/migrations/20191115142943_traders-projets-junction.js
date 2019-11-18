exports.up = function(knex) {
  return knex.schema.createTable(
    'traders-projects-junction',
    tradersProjectsJunction => {
      tradersProjectsJunction
        .string('trader_username')
        .references('traders.username');
      tradersProjectsJunction
        .integer('project_id')
        .references('projects.project_id');
    }
  );
};

exports.down = function(knex) {
  return knex.schema.dropTable('traders-projects-junction');
};
