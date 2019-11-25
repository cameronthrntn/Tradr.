exports.up = function(knex) {
  return knex.schema.table('traders', traderTable => {
    traderTable.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.table('traders', traderTable => {
    traderTable.dropColumn('password');
  });
};
