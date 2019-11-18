exports.up = function(knex) {
  return knex.schema.createTable('projects', projectsTable => {
    projectsTable.increments('project_id').primary();
    projectsTable.float('long').notNullable();
    projectsTable.float('lat').notNullable();
    projectsTable
      .string('username')
      .references('users.username')
      .notNullable();
    projectsTable.string('title').notNullable();
    projectsTable.string('status').defaultTo('in progress');
    projectsTable.timestamp('start_date').notNullable();
    projectsTable.timestamp('end_date').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
