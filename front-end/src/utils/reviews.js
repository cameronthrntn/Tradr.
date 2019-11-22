const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const getReviewsByUsername = async username => {
  console.log(username);

  const { data } = await axios.get(
    `${BASEURL}/reviews?trader_username=${username}`
  );
  return data.reviews;
};

export { getReviewsByUsername };
