const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const uploadAvatar = async (trader, username, avatar_ref) => {
  const { data } = await axios.patch(
    `${BASEURL}/${trader ? 'traders' : 'users'}/${username}`,
    { avatar_ref }
  );
};

export { uploadAvatar };
