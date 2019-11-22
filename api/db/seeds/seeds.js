const {
  imagesData,
  userData,
  projectsData,
  tradersData,
  projectsTradersData,
  reviewsData,
  requestsData
} = require('../data/index');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const seedUsers = () => {
        return knex.insert(userData).into('users');
      };
      const seedTraders = () => {
        return knex.insert(tradersData).into('traders');
      };
      return Promise.all([seedUsers(), seedTraders()]);
    })
    .then(() => {
      const seedProjects = () => {
        return knex.insert(reviewsData).into('reviews');
      };
      const seedReviews = () => {
        return knex.insert(projectsData).into('projects');
      };

      return Promise.all([seedProjects(), seedReviews()]);
    })
    .then(() => {
      const seedProjectTraders = () => {
        return knex
          .insert(projectsTradersData)
          .into('traders-projects-junction');
      };
      const seedImages = () => {
        return knex.insert(imagesData).into('images');
      };
      const seedRequests = () => {
        return knex.insert(requestsData).into('requests');
      };
      return Promise.all([seedProjectTraders(), seedImages(), seedRequests()]);
    });
};
