const usersRouter = require('express').Router();
const { postUser, updateUser } = require('../controllers/users-controller');
const { handle405s } = require('../errors');

usersRouter
  .route('/')
  .post(postUser)
  .all(handle405s);

usersRouter
  .route('/:username')
  .patch(updateUser)
  .all(handle405s);

module.exports = usersRouter;
