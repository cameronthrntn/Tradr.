const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const postAccount = async (type, body) => {
  const { data } = await axios.post(`${BASEURL}/${type}s`, body);
  return data[type];
};

const getCoordinates = async address => {
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: { address, key: 'AIzaSyCLjaFTw1ZCyLDZrMtk7uX6PkISOr0u-Vk' }
    }
  );
  return data.results[0].geometry.location;
};

const formatDate = dob => {
  const dateArr = dob.split('-');
  const year = dateArr.shift();
  dateArr.push(year);
  return dateArr.join('/');
};

export { postAccount, getCoordinates, formatDate };
