const { instance } = require('./axios');
const BASEURL = 'http://localhost:9090/api';

const getTraders = async (project_id, filters) => {
  const { data } = await instance.get(`${BASEURL}/traders`, {
    params: { project_id, ...filters }
  });

  return data.traders;
};

const getTrader = async username => {
  const { data } = await instance.get(`${BASEURL}/traders/${username}`);
  return data.trader;
};

const getTraderRequests = async trader_username => {
  const { data } = await instance.get(`${BASEURL}/requests`, {
    params: { trader_username }
  });

  return data.requests;
};

export { getTraders, getTrader, getTraderRequests };
