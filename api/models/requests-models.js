const { connection } = require('../db/connection');

exports.fetchRequests = ({ user_username, trader_username }) => {
  return connection('requests').modify(query => {
    if (user_username) query.where({ user_username });
    if (trader_username) query.where({ trader_username });
  });
};

exports.removeRequest = ({ request_id, a }) => {
  if (a) {
    return connection('requests')
      .where({ request_id })
      .del();
  } else {
    return connection('requests')
      .where({ request_id })
      .del();
  }
};

exports.insertRequest = async body => {
  const getOwner = async () => {
    const userOfProject = await connection('projects')
      .select('username')
      .where('project_id', body.project_id)
      .where('username', body.user_username);
    return userOfProject;
  };
  const getTraders = async () => {
    const tradersOfProjects = await connection('projects')
      .join(
        'traders-projects-junction',
        'projects.project_id',
        'traders-projects-junction.project_id'
      )
      .select('trader_username')
      .where('projects.project_id', body.project_id)
      .where('trader_username', body.trader_username);
    return tradersOfProjects;
  };
  const getTraderRequests = async () => {
    const traderRequests = await exports.fetchRequests({
      trader_username: body.trader_username
    });
    return traderRequests.filter(
      request => request.project_id === body.project_id
    );
  };
  const arrays = await Promise.all([
    getTraders(),
    getTraderRequests(),
    getOwner()
  ]);

  return !arrays[0].length && !arrays[1].length && arrays[2].length > 0
    ? connection('requests')
        .insert(body)
        .returning('*')
    : Promise.reject({ code: '400' });
};
