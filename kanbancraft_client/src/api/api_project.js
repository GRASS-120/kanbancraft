import { api } from './instance';

export const getAllProjectsByNickname = async (nickname) => {
  try {
    const res = await api.get(`/projects?nickname=${nickname}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const getProjectMembersById = async (projectId) => {
  try {
    const res = await api.get(`/projects/${projectId}/users`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const addProject = async (nickname, projectName) => {
  try {
    const res = await api.post(
      `/projects/add?nickname=${nickname}&project_name=${projectName}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const updateProjectNameById = async (
  projectId,
  nickname,
  newProjectName
) => {
  try {
    const res = await api.patch(
      `/projects/${projectId}/change_name?nickname=${nickname}&new_project_name=${newProjectName}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};

// ! пока не работает, так как нет юзеров
export const inviteUserInProject = async (projectId, newMemberId) => {
  try {
    const res = await api.patch(
      `/projects/${projectId}/invite_member?new_member_id=${newMemberId}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};
