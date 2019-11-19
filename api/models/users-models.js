const { connection } = require('../db/connection');

exports.insertUser = body => {
  return connection('users')
    .insert(body)
    .returning('*');
};

exports.patchUser = ({ first_name, last_name, avatar_ref }, username) => {
  return connection('users')
    .where('username', '=', username)
    .modify(modifier => {
      if (first_name) modifier.update({ first_name }).returning('*');
      if (last_name) modifier.update({ last_name }).returning('*');
      if (avatar_ref) modifier.update({ avatar_ref }).returning('*');
    });
};
