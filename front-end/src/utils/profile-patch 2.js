const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const updateProfile = async (body, trader, username) => {
  const { data } = await axios.patch(
    `${BASEURL}/${trader ? 'traders' : 'users'}/${username}`,
    { ...body }
  );

  return data;
};

export { updateProfile };
