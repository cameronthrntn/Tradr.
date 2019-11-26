const { fetchMessages, insertMessage } = require('../models/messages-models');

exports.getMessages = (req, res, next) => {
  fetchMessages(req.query)
    .then(messages => {
      res.send({ messages });
    })
    .catch(next);
};

exports.postMessage = (req, res, next) => {
  insertMessage(req.body)
    .then(([message]) => {
      res.status(201).send({ message });
    })
    .catch(next);
};
