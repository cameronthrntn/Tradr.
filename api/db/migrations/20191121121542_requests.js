exports.up = function(knex) {
  return knex.schema.createTable('requests', requestsTable => {
    requestsTable.increments('request_id').primary();
    requestsTable.string('user_username').references('users.username');
    requestsTable.string('trader_username').references('traders.username');
    requestsTable.integer('project_id').references('projects.project_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('requests');
};
