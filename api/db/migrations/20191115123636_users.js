exports.up = function(knex) {
  return knex.schema.createTable('users', usersTable => {
    usersTable
      .string('username')
      .notNullable()
      .primary();
    usersTable.string('first_name').notNullable();
    usersTable.string('last_name').notNullable();
    usersTable
      .string('avatar_ref')
      .defaultTo(
        'https://firebasestorage.googleapis.com/v0/b/tradr-4959b.appspot.com/o/images%2Fc0749ecb-ade4-4d23-8faf-da5732049b96.jpeg\\?alt=media&token=3b89da28-d162-4368-a868-c82436a375f6'
      );
    usersTable.timestamp('dob').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
