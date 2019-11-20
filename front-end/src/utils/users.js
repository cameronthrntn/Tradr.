const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const getUser = async username => {
  const { data } = await axios.get(`${BASEURL}/users/${username}`);
  return data.user[0];
};

export { getUser };
