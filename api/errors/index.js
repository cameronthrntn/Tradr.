exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};

exports.handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: 'internal server error!' });
};
