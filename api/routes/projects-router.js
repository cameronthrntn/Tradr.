const projectsRouter = require('express').Router();
const {
  getAllProjects,
  postNewProject
} = require('../controllers/projects-controllers');
const { handle405s } = require('../errors/index');

projectsRouter
  .route('/')
  .get(getAllProjects)
  .post(postNewProject)
  .all(handle405s);

module.exports = projectsRouter;
