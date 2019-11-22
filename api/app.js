const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
const {
  handleCustomErrors,
  handle400s,
  handle405s,
  handle500s
} = require('./errors');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);
app.all('/*', (req, res, next) =>
  res.status(404).send({ msg: 'Route not found' })
);

app.use(handleCustomErrors);
app.use(handle400s);
app.use(handle405s);
app.use(handle500s);

module.exports = { app };
