exports.up = function(knex) {
  return knex.schema.createTable('users', usersTable => {
    usersTable.increments('user_id').primary();
    usersTable.string('username').notNullable();
    usersTable.string('first_name').notNullable();
    usersTable.string('last_name').notNullable();
    usersTable
      .string('avatar_ref')
      .defaultTo('../data/dev/img/default-avatar.png');
    usersTable.timestamp('dob').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
