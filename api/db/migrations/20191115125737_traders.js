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
      .defaultsTo(
        'https://firebasestorage.googleapis.com/v0/b/tradr-4959b.appspot.com/o/images%2Fc0749ecb-ade4-4d23-8faf-da5732049b96.jpeg?alt=media&token=3b89da28-d162-4368-a868-c82436a375f6'
      );
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('traders');
};
