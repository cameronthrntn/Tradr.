const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const getTraders = async (project_id, filters) => {
  const { data } = await axios.get(`${BASEURL}/traders`, {
    params: { project_id, ...filters }
  });
  return data.traders;
};

const getTrader = async username => {
  const { data } = await axios.get(`${BASEURL}/traders/${username}`);
  console.log(data);

  return data.trader;
};

export { getTraders, getTrader };
