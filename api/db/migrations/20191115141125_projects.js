exports.up = function(knex) {
  return knex.schema.createTable('projects', projectsTable => {
    projectsTable.increments('project_id').primary();
    projectsTable.float('lng').notNullable();
    projectsTable.float('lat').notNullable();
    projectsTable
      .string('username')
      .references('users.username')
      .notNullable();
    projectsTable.string('title').notNullable();
    projectsTable.string('status').defaultTo('in planning');
    projectsTable.timestamp('start_date').notNullable();
    projectsTable.timestamp('end_date').notNullable();
    projectsTable
      .string('avatar_ref')
      .defaultTo(
        'https://firebasestorage.googleapis.com/v0/b/tradr-4959b.appspot.com/o/images%2Fhouse-outline.svg\\?alt=media&token=acb3f7ee-9c26-4169-a374-c14d5c9c208a'
      );
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('projects');
};
