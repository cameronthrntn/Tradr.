const apiRouter = require('express').Router();
const usersRouter = require('./users-router');
const tradersRouter = require('./traders-router');
const projectsRouter = require('./projects-router');
const reviewsRouter = require('./reviews-router');
const requestsRouter = require('./requests-router');
const { loginController } = require('../controllers/login-controllers');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../knexfile');

// const { handle405s } = require('../errors');

apiRouter.route('/');
//   .all(handle405s);

apiRouter.post('/login', loginController);

apiRouter.use((req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization) {
    token = authorization.split(' ')[1];
  } else {
    res.status(400).send({ msg: 'Invalid header' });
  }
  jwt.verify(token, JWT_SECRET, (err, response) => {
    if (err) {
      console.log(err, '<~ Error');
      res.status(500).send({ msg: 'Internal Authentication exception' });
    } else next();
  });
});

apiRouter.use('/users', usersRouter);
apiRouter.use('/traders', tradersRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/reviews', reviewsRouter);
apiRouter.use('/requests', requestsRouter);

module.exports = apiRouter;
