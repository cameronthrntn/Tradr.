const {
  fetchRequests,
  insertRequest,
  removeRequest
} = require('../models/requests-models');

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

exports.deleteRequest = (req, res, next) => {
  removeRequest(req.body)
    .then(rows => {
      if (rows === 1 || rows.length > 0) {
        res.send({ rows });
      } else {
        res.status(404).send({ msg: 'request not found!' });
      }
    })
    .catch(next);
};
