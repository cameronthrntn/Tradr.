const { instance } = require('./axios');
const { getCity } = require('./makeAccount');

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

const getTraderRequests = async trader_username => {
  const { data } = await instance.get(`${BASEURL}/requests`, {
    params: { trader_username }
  });

  data.requests.map(async request => {
    request.city = await getCity(request.lat, request.lng);
    return request;
  });

  return data.requests;
};

export { getTraders, getTrader, getTraderRequests, getTradersOnProject };
