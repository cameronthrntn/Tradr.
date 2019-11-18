const { connection } = require('../db/connection');

exports.selectAllProjects = () => {
  return connection
    .select('*')
    .from('projects')
    .returning('*');
};
