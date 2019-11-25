const { instance } = require('./axios');
const axios = require('axios');

const postAccount = async (type, body) => {
  const { data } = await instance.post(`/${type}s`, body);
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

const getCity = async (lat, long) => {
  const latlng = `${lat},${long}`;
  const { data } = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: { latlng, key: 'AIzaSyCLjaFTw1ZCyLDZrMtk7uX6PkISOr0u-Vk' }
    }
  );
  return data.results[0].address_components[2].long_name;
};

const formatDate = dob => {
  const dateArr = dob.split('-');
  const year = dateArr.shift();
  dateArr.push(year);
  return dateArr.join('/');
};

export { postAccount, getCoordinates, getCity, formatDate };
