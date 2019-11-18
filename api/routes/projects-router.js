const projectsRouter = require('express').Router();
const { getAllProjects } = require('../controllers/projects-controllers');
const { handle405s } = require('../errors/index');

projectsRouter
  .route('/')
  .get(getAllProjects)
  .all(handle405s);

module.exports = projectsRouter;
