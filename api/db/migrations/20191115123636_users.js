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
        'https://firebasestorage.googleapis.com/v0/b/tradr-4959b.appspot.com/o/images%2Fimage.jpeg?alt=media&token=6e64d204-8665-44f3-8fa7-fd7ad58d488d'
      );
    usersTable.timestamp('dob').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
