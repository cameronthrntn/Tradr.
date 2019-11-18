const {
  selectAllProjects,
  insertNewProject
} = require('../models/projects-models');

exports.getAllProjects = (req, res, next) => {
  return selectAllProjects(req.query)
    .then(projects => {
      res.status(200).send({ projects });
    })
    .catch(next);
};

exports.postNewProject = (req, res, next) => {
  return insertNewProject(req)
    .then(project => {
      res.status(201).send({ project });
    })
    .catch(next);
};
