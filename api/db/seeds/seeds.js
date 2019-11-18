const {
  imagesData,
  userData,
  projectsData,
  tradersData,
  projectsTradersData
} = require('../data/index');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(userData)
        .into('users')
        .returning('*');
    })
    .then(res => {
      return knex
        .insert(tradersData)
        .into('traders')
        .returning('*');
    })
    .then(res => {
      return knex
        .insert(projectsData)
        .into('projects')
        .returning('*');
    })
    .then(res => {
      console.log(res);
    });
};
