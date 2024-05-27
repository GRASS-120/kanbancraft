import { api } from './instance';

export const getBoardsByProjectId = async (projectId) => {
  try {
    const res = await api.get(`/boards?project_id=${projectId}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const addBoard = async (projectId, boardName) => {
  try {
    const res = await api.post(
      `/boards/add?project_id=${projectId}&board_name=${boardName}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const updateBoardNameById = async (boardId, newName) => {
  try {
    const res = await api.patch(
      `/boards/${boardId}/change_name?new_name=${newName}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};
