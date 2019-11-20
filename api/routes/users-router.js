const usersRouter = require('express').Router();
const {
  postUser,
  updateUser,
  getUserByUsername
} = require('../controllers/users-controller');
const { handle405s } = require('../errors');

usersRouter
  .route('/')
  .post(postUser)
  .all(handle405s);

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .patch(updateUser)
  .all(handle405s);

module.exports = usersRouter;
