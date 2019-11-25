const { instance } = require('./axios');

const updateProfile = async (body, trader, username) => {
  console.log(body);
  const { data } = await instance.patch(
    `/${trader ? 'traders' : 'users'}/${username}`,
    { ...body }
  );
  console.log(data);

  return data;
};

export { updateProfile };
