exports.up = function(knex) {
  return knex.schema.createTable('images', imagesTable => {
    imagesTable.increments('image_id').primary();
    imagesTable.integer('project_id').references('projects.project_id');
    imagesTable.string('path').notNullable();
    imagesTable
      .string('avatar_ref')
      .defaultTo(
        'https://firebasestorage.googleapis.com/v0/b/tradr-4959b.appspot.com/o/images%2Fhouse-outline.svg\\?alt=media&token=acb3f7ee-9c26-4169-a374-c14d5c9c208a'
      );
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
