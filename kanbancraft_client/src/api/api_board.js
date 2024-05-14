import { api } from './instance';

export const getBoardsByProjectId = async (projectId) => {
  try {
    const res = await api.get('/boards');
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const addBoard = async (payload) => {
  try {
    const res = await api.post('/boards', payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const updateBoardName = async (boardId, payload) => {
  try {
    const res = await api.patch(`/boards/${boardId}`, payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};
