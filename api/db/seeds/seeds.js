const {
  imagesData,
  userData,
  projectsData,
  tradersData,
  projectsTradersData,
  reviewsData,
  requestsData
} = require('../data/index');
const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const seedUsers = () => {
        const encryptedusers = userData.map(user => ({
          ...user,
          password: bcrypt.hashSync(user.password, 10)
        }));
        return knex.insert(encryptedusers).into('users');
      };
      const seedTraders = () => {
        const encryptedTraders = tradersData.map(trader => ({
          ...trader,
          password: bcrypt.hashSync(trader.password, 10)
        }));
        return knex.insert(encryptedTraders).into('traders');
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
