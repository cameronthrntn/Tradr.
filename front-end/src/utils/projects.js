const { instance } = require('./axios');

const getProject = async id => {
  const { data } = await instance.get(`/projects/${id}`);
  return data.project[0];
};

const getProjectsByUsername = async username => {
  const { data } = await instance.get(`/projects?username=${username}`);
  return data.projects;
};

const getProjectsByTrader = async trader => {
  const { data } = await instance.get(`/projects?trader=${trader}`);
  return data.projects;
};

const postNewProject = async project => {
  const { data } = await instance.post(`/projects`, project);
  return data.project;
};

export {
  getProject,
  getProjectsByUsername,
  getProjectsByTrader,
  postNewProject
};
