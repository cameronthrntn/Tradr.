const { instance } = require('./axios');

const getProject = async id => {
  const { data } = await instance.get(`/projects/${id}`);
  return data.project[0];
};

const getProjectsByUsername = async username => {
  const { data } = await instance.get(`/projects`, { params: { username } });
  return data.projects;
};

const getProjectsByTrader = async trader => {
  const { data } = await instance.get(`/projects`, { params: { trader } });
  return data.projects;
};

const postNewProject = async project => {
  const { data } = await instance.post(`/projects`, project);
  return data.project[0];
};

const getProjectImages = async id => {
  const { data } = await instance.get(`/projects/${id}/images`);
  return data;
};

const filterProjects = projects => {
  return projects.filter(project => {
    return project.status === 'complete';
  });
};

export {
  getProject,
  getProjectsByUsername,
  getProjectsByTrader,
  postNewProject,
  getProjectImages,
  filterProjects
};
