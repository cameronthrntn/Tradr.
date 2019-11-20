const {
  selectAllProjects,
  selectTradersByProject,
  insertNewProject,
  selectProjectById,
  updateProject
} = require('../models/projects-models');

exports.getAllProjects = (req, res, next) => {
  return selectAllProjects(req.query)
    .then(projects => {
      res.status(200).send({ projects });
    })
    .catch(next);
};

exports.getTradersByProject = (req, res, next) => {
  return selectTradersByProject(req.params.id)
    .then(traders => {
      res.status(200).send({ traders });
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

exports.getProjectsById = (req, res, next) => {
  return selectProjectById(req.params.id)
    .then(project => {
      res.status(200).send({ project });
    })
    .catch(next);
};

exports.patchProject = (req, res, next) => {
  updateProject(req.body, req.params.id)
    .then(project => {
      res.status(200).send({ project });
    })
    .catch(next);
};
