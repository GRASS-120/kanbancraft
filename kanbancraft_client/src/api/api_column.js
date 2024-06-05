import { api } from './instance';

export const getAllColumnsByBoardId = async (boardId) => {
  try {
    const res = await api.get(`/columns?board_id=${boardId}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const addColumn = async (boardId, columnName) => {
  try {
    const res = await api.post(
      `/columns/add?board_id=${boardId}&column_name=${columnName}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const updateColumnName = async (columnId, newName) => {
  try {
    const res = await api.patch(
      `/columns/${columnId}/change_name?new_name=${newName}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};

export const updateColumnColor = async (columnId, newColor) => {
  try {
    const res = await api.patch(
      `/columns/${columnId}/change_color?new_color=${newColor}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};

export const deleteColumn = async (columnId) => {
  try {
    const res = await api.delete(`/columns/${columnId}/delete`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении DELETE запроса:', error);
  }
};
