import { api } from './instance';

export const getAllProjects = async () => {
  try {
    const res = await api.get('/projects');
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const addProject = async (payload) => {
  try {
    const res = await api.post('/data', payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const updateProjectName = async (projectId, payload) => {
  try {
    const res = await api.patch(`/projects/${projectId}`, payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};
