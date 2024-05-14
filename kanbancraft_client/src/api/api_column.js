import { api } from './instance';

// ? columns + tasks
export const getAllColumnsByBoardId = async (boardId) => {
  try {
    const res = await api.get('/columns');
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const addColumn = async (payload) => {
  try {
    const res = await api.post('/columns', payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const updateColumnName = async (columnId, payload) => {
  try {
    const res = await api.patch(`/columns/${columnId}`, payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};

export const updateColumnColor = async (columnId, payload) => {
  try {
    const res = await api.patch(`/columns/${columnId}`, payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};

export const deleteColumn = async (columnId) => {
  try {
    const res = await api.delete(`/columns/${columnId}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении DELETE запроса:', error);
  }
};
