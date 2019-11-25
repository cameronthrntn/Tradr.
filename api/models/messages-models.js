const { connection } = require('../db/connection');

exports.fetchMessages = ({ project_id }) => {
  return connection('messages').where({ project_id });
};

exports.insertMessage = body => {
  return connection('messages')
    .insert(body)
    .returning('*');
};
