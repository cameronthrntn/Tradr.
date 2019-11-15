const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
// const { handleSQLError } = require('./errors');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/api', apiRouter);
app.all('/*', (req, res, next) =>
  res.status(404).send({ msg: 'Route not found' })
);

// app.use(handleSQLError);

module.exports = { app };
