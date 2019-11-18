const apiRouter = require('express').Router();
const usersRouter = require('./users-router');
const tradersRouter = require('./traders-router');

// const { handle405s } = require('../errors');

apiRouter.route('/');
//   .all(handle405s);

apiRouter.use('/users', usersRouter);
apiRouter.use('/traders', tradersRouter);

module.exports = apiRouter;
