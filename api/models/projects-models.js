const { connection } = require('../db/connection');

exports.selectAllProjects = ({
  sort_by = 'start_date',
  order = 'desc',
  username,
  status,
  trader
}) => {
  return connection
    .select('*')
    .from('projects')
    .orderBy(sort_by, order)
    .modify(modifier => {
      if (username) modifier.where('username', '=', username);
      if (status) modifier.where('status', '=', status);
      if (trader)
        modifier
          .select('*')
          .from('traders-projects-junction')
          .join(
            'projects',
            'projects.project_id',
            '=',
            'traders-projects-junction.project_id'
          )
          .where('traders-projects-junction.trader_username', '=', trader);
    });
};

exports.selectTradersByProject = id => {
  return connection
    .select('*')
    .from('traders-projects-junction')
    .join(
      'projects',
      'projects.project_id',
      '=',
      'traders-projects-junction.project_id'
    )
    .where('traders-projects-junction.project_id', '=', id);
};

exports.insertNewProject = ({ body }) => {
  return connection('projects')
    .insert(body)
    .returning('*');
};

exports.selectProjectById = id => {
  return connection
    .select('*')
    .from('projects')
    .where('project_id', '=', id);
};
