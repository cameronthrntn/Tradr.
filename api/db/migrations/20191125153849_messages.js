exports.up = function(knex) {
  return knex.schema.createTable('messages', messagesTable => {
    messagesTable.increments('message_id').primary();
    messagesTable.string('body');
    messagesTable.string('trader_username').references('traders.username');
    messagesTable.string('user_username').references('users.username');
    messagesTable.integer('project_id').references('projects.project_id');
    messagesTable.timestamp('timestamp').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};
