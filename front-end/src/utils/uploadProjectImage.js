const { instance } = require('./axios');

const uploadProjectImage = async (id, path) => {
  const { data } = await instance.post(`/projects/${id}/images`, { path });
};

export { uploadProjectImage };
