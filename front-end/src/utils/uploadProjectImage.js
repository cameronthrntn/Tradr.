const { instance } = require('./axios');

const uploadProjectImage = async (id, path) => {
  console.log(id, path, '<------- in utils');

  const { data } = await instance.post(`/projects/${id}/images`, { path });
};

export { uploadProjectImage };
