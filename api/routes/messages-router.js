const messagesRouter = require('express').Router();
const {
  getMessages,
  postMessage
} = require('../controllers/messages-controller');
const { handle405s } = require('../errors');

messagesRouter
  .route('/')
  .get(getMessages)
  .post(postMessage)
  .all(handle405s);

module.exports = messagesRouter;
