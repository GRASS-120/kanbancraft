import { api } from './instance';

export const addTask = async (payload) => {
  try {
    const res = await api.post('/tasks', payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const updateTaskText = async (taskId, payload) => {
  try {
    const res = await api.patch(`/tasks/${taskId}`, payload);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};

export const deleteTask = async (taskId) => {
  try {
    const res = await api.delete(`/tasks/${taskId}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении DELETE запроса:', error);
  }
};
