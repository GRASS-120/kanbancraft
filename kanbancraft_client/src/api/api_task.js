import { api } from './instance';

export const getAllTasksByColumnId = async (columnId) => {
  try {
    const res = await api.get(`/tasks?column_id=${columnId}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const addTask = async (columnId, description) => {
  try {
    const res = await api.post(
      `/tasks/add?column_id=${columnId}&description=${description}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const updateTaskDescription = async (taskId, newDescription) => {
  try {
    const res = await api.patch(
      `/tasks/${taskId}/change_description?new_description=${newDescription}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};

export const moveTask = async (taskId, columnId) => {
  try {
    const res = await api.patch(`/tasks/${taskId}/move_to/${columnId}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await api.delete(`/tasks/${taskId}/delete`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении DELETE запроса:', error);
  }
};
