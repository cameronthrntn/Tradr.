const { connection } = require('../db/connection');
const bcrypt = require('bcrypt');

exports.insertUser = body => {
  const user = { ...body };
  user.password = bcrypt.hashSync(user.password, 10);
  return connection('users')
    .insert(user)
    .returning('*');
};

exports.patchUser = ({ first_name, last_name, avatar_ref, dob }, username) => {
  return connection('users')
    .where('username', '=', username)
    .modify(modifier => {
      if (first_name) modifier.update({ first_name }).returning('*');
      if (last_name) modifier.update({ last_name }).returning('*');
      if (avatar_ref) modifier.update({ avatar_ref }).returning('*');
      if (dob) modifier.update({ dob }).returning('*');
    });
};

exports.fetchUserByUsername = username => {
  return connection('users')
    .select('username', 'dob', 'first_name', 'last_name', 'avatar_ref')
    .where('username', '=', username);
};
