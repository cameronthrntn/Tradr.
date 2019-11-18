exports.up = function(knex) {
  return knex.schema.createTable('traders', tradersTable => {
    tradersTable
      .string('username')
      .primary()
      .notNullable();
    tradersTable.string('first_name').notNullable();
    tradersTable.string('last_name').notNullable();
    tradersTable.float('lng').notNullable();
    tradersTable.float('lat').notNullable();
    tradersTable.integer('rate').defaultsTo(0);
    tradersTable.timestamp('dob').notNullable();
    tradersTable.float('score').defaultsTo(0);
    tradersTable.string('personal_site').defaultsTo('n/a');
    tradersTable.string('trade').notNullable();
    tradersTable
      .string('avatar_ref')
      .defaultsTo('/api/data/dev/img/default-avatar.png');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('traders');
};
