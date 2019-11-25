const { instance } = require('./axios');

const getTraders = async (project_id, filters) => {
  const { data } = await instance.get(`/traders`, {
    params: { project_id, ...filters }
  });

  return data.traders;
};

const getTrader = async username => {
  const { data } = await instance.get(`/traders/${username}`);
  return data.trader;
};

const getTradersOnProject = async project_id => {
  const { data } = await instance.get(`/projects/${project_id}/traders`);
  console.log(data.traders);

  return data.traders;
};

export { getTraders, getTrader, getTradersOnProject };
