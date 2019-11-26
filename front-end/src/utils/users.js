const { instance } = require('./axios');

const getUser = async (username, authorization) => {
  const { data } = await instance.get(`/users/${username}`);

  return data.user[0];
};

export { getUser };
