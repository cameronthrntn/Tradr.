const { connection } = require('../db/connection');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../knexfile');
const bcrypt = require('bcrypt');

exports.loginController = async (req, res, next) => {
  const { type, username, password } = req.body;

  const [passwordOk, user] =
    type === 'user'
      ? await connection('users')
          .select('*')
          .where({ username })
          .then(user => {
            if (user[0])
              return Promise.all([
                bcrypt.compare(password, user[0].password),
                user
              ]);
            else next({ code: 'invalidCredentials' });
          })
      : await connection('traders')
          .select('*')
          .where({ username })
          .then(([trader]) => {
            if (trader)
              return Promise.all([
                bcrypt.compare(password, trader.password),
                trader
              ]);
            else next({ code: 'invalidCredentials' });
          });
  try {
    if (user && passwordOk) {
      const token = jwt.sign(
        { user: user.username, iat: Date.now() },
        JWT_SECRET
      );
      res.send({ token });
    } else {
      next({ code: 'invalidCredentials' });
    }
  } catch (e) {
    next(e);
  }
};
