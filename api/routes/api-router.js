const apiRouter = require('express').Router();
const usersRouter = require('./users-router');
const tradersRouter = require('./traders-router');
const projectsRouter = require('./projects-router');
const reviewsRouter = require('./reviews-router');
const requestsRouter = require('./requests-router');

// const { handle405s } = require('../errors');

apiRouter.route('/');
//   .all(handle405s);

apiRouter.use('/users', usersRouter);
apiRouter.use('/traders', tradersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/requests', requestsRouter);

module.exports = apiRouter;
