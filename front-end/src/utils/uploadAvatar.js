const { instance } = require('./axios');
const BASEURL = 'http://localhost:9090/api';

const uploadAvatar = async (trader, username, avatar_ref) => {
  const { data } = await instance.patch(
    `/${trader ? 'traders' : 'users'}/${username}`,
    { avatar_ref }
  );
};

export { uploadAvatar };
