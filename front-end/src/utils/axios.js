const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://nc-tradr.herokuapp.com/api',
  headers: {
    authorization: {
      toString() {
        return `BEARER ${sessionStorage.getItem('token')}`;
      }
    }
  }
});

export { instance };
