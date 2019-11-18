const { selectAllProjects } = require('../models/projects-models');

exports.getAllProjects = (req, res, next) => {
  return selectAllProjects(req.query)
    .then(projects => {
      res.status(200).send({ projects });
    })
    .catch(next);
};