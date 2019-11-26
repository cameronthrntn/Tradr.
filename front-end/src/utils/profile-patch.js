const { instance } = require('./axios');

const updateProfile = async (body, trader, username) => {
  const { data } = await instance.patch(
    `/${trader ? 'traders' : 'users'}/${username}`,
    { ...body }
  );

  return data;
};

export { updateProfile };
