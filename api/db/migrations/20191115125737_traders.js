exports.up = function(knex) {
  return knex.schema.createTable('traders', tradersTable => {
    tradersTable
      .string('username')
      .primary()
      .notNullable();
    tradersTable.string('first_name').notNullable();
    tradersTable.string('last_name').notNullable();
    tradersTable.integer('longitude').notNullable();
    tradersTable.integer('latitude').notNullable();
    tradersTable.integer('rate').defaultsTo('negotiable');
    tradersTable.integer('score').defaultsTo(0);
    tradersTable.string('website').defaultsTo('n/a');
    tradersTable.string('trade').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('traders');
};
