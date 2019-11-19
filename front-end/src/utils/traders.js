const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const getTraders = async (project_id, filters) => {
  const { data } = await axios.get(`${BASEURL}/traders`, {
    params: { project_id, ...filters }
  });
  return data.traders;
};

export { getTraders };
