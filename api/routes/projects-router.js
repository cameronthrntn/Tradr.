const projectsRouter = require('express').Router();
const {
  getAllProjects,
  postNewProject,
  getTradersByProject,
  getProjectsById,
  patchProject
} = require('../controllers/projects-controllers');
const { handle405s } = require('../errors/index');

projectsRouter
  .route('/')
  .get(getAllProjects)
  .post(postNewProject)
  .all(handle405s);

projectsRouter
  .route('/:id')
  .get(getProjectsById)
  .patch(patchProject)
  .all(handle405s);

projectsRouter
  .route('/:id/traders')
  .get(getTradersByProject)
  .all(handle405s);

module.exports = projectsRouter;
