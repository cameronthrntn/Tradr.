const { selectAllProjects } = require('../models/projects-models');

exports.getAllProjects = (req, res, next) => {
  selectAllProjects().then(projects => {
    console.log(projects);

    res.status(200).send({ projects });
  });
};
