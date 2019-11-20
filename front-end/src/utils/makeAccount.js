const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';
const postTrader = async body => {
  const { data } = await axios.post(`${BASEURL}/traders`, {});
};
const postUser = () => {};

const getCoordinates = async address => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json
  `,
    { params: { address } }
  );
  console.log(data);
};
