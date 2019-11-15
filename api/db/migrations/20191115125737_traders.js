exports.up = function(knex) {
  return knex.schema.createTable('traders', tradersTable => {
    tradersTable
      .string('username')
      .primary()
      .notNullable();
    tradersTable.string('first_name').notNullable();
    tradersTable.string('last_name').notNullable();
    tradersTable.float('longitude').notNullable();
    tradersTable.float('latitude').notNullable();
    tradersTable.integer('rate').defaultsTo('negotiable');
    tradersTable.integer('score').defaultsTo(0);
    tradersTable.string('website').defaultsTo('n/a');
    tradersTable.string('trade').notNullable();
    tradersTable
      .string('avatar_ref')
      .defaultsTo('./api/data/dev/img/default-avatar.png');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('traders');
};
