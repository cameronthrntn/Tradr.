const { instance } = require('./axios');

const getMessages = async project_id => {
  const { data } = await instance.get(`/messages`, { params: { project_id } });
  return data.messages;
};

const postMessage = async message => {
  const { data } = await instance.post(`/messages`, message);
  return data.message;
};

export { getMessages, postMessage };
