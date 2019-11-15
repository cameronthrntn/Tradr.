exports.up = function(knex) {
  return knex.schema.createTable('users', usersTable => {
    usersTable.increments('user_id').primary();
    usersTable.string('username').notNullable();
    usersTable.string('first_name').notNullable();
    usersTable.string('last_name').notNullable();
    usersTable
      .string('avatar_ref')
      .defaultTo(
        'https://everydaynutrition.co.uk/wp-content/uploads/2015/01/default-user-avatar.png'
      );
    usersTable.timestamp().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
