const { fetchRequests, insertRequest } = require('../models/requests-models');

exports.getRequests = (req, res, next) => {
  fetchRequests(req.query)
    .then(requests => {
      res.send({ requests });
    })
    .catch(next);
};

exports.postRequest = (req, res, next) => {
  insertRequest(req.body)
    .then(([request]) => {
      res.status(201).send({ request });
    })
    .catch(next);
};
