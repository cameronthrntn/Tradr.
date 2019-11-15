exports.up = function(knex) {
  return knex.schema.createTable('images', imagesTable => {
    imagesTable.increments('image_id').primary();
    imagesTable.integer('user_id').references('users.user_id');
    imagesTable.integer('project_id').references('projects.project_id');
    imagesTable.integer('trader_id').references('traders.trader_id');
    imagesTable.string('type').notNullable();
    imagesTable.string('path').notNullable();
  });
};

exports.down = function(knex) {};
