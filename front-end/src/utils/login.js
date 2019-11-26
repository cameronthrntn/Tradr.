const { instance } = require('./axios');

const login = async credentials => {
  const { data } = await instance.post(`/login`, credentials);
  sessionStorage.setItem('token', data.token);
  return data.token;
};

export { login };
