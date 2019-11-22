exports.handleCustomErrors = (err, req, res, next) => {
  if (err.msg === 'tradesperson already added to project') {
    res.status(400).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle400s = (err, req, res, next) => {
  const errCodes = ['22P02', '42703', '400'];
  if (errCodes.includes(err.code)) {
    res.status(400).send({ msg: 'bad request' });
  } else {
    next(err);
  }
};

exports.handle404s = (err, req, res, next) => {
  const errCodes = ['23503'];
  if (errCodes.includes(err.code)) {
    res.status(404).send({ msg: 'item not found ' });
  } else {
    next(err);
  }
};

exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};

exports.handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: 'internal server error!' });
};
