exports.up = function(knex) {
  return knex.schema.createTable('images', imagesTable => {
    imagesTable.increments('image_id').primary();
    imagesTable.integer('project_id').references('projects.project_id');
    imagesTable.string('path').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
