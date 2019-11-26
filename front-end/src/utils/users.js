const { instance } = require('./axios');

const getUser = async (username, authorization) => {
  const { data } = await instance.get(`/users/${username}`);

  return data.user[0];
};

const postRequest = async body => {
  const { data } = await instance.post(`/requests`, body);
  return data.request;
};

export { getUser, postRequest };
