const axios = require('axios');
const BASEURL = 'http://localhost:9090/api';

const getProject = async id => {
  const { data } = await axios.get(`${BASEURL}/projects/${id}`);
  return data.project[0];
};

const getProjectsByUsername = async username => {
  const { data } = await axios.get(`${BASEURL}/projects?username=${username}`);
  return data.projects;
};

const getProjectsByTrader = async trader => {
  const { data } = await axios.get(`${BASEURL}/projects?trader=${trader}`);
  return data.projects;
};

export { getProject, getProjectsByUsername, getProjectsByTrader };
