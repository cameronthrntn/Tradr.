const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const getProject = async id => {
  const { data } = await axios.get(`${BASEURL}/projects/${id}`);
  return data.project[0];
};

export { getProject };
