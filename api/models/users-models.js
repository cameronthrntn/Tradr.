const { connection } = require('../db/connection');

exports.insertUser = body => {
  return connection('users')
    .insert(body)
    .returning('*');
};
