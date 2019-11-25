const { instance } = require('./axios');

const getUser = async (username, authorization) => {
  console.log('...getting user...');

  const { data } = await instance.get(`/users/${username}`);
  console.log(data);

  return data.user[0];
};

export { getUser };
