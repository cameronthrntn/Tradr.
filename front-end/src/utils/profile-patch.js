const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const updateProfile = async (body, trader, username) => {
  console.log(body);
  const { data } = await axios.patch(
    `${BASEURL}/${trader ? 'traders' : 'users'}/${username}`,
    { ...body }
  );
  console.log(data);

  return data;
};

export { updateProfile };
