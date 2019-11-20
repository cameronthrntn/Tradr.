const { insertUser, patchUser } = require('../models/users-models');

exports.postUser = (req, res, next) => {
  insertUser(req.body)
    .then(user => {
      res.status(201).send({ user });
    })
    .catch(next);
};

exports.updateUser = (req, res, next) => {
  patchUser(req.body, req.params.username)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};
