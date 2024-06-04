import { api } from './instance';

export const getAllUsers = async () => {
  try {
    const res = await api.get(`/users/all`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

// !
export const getUserByNickname = async (nickname) => {
  try {
    const res = await api.get(`/users/all`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const registration = async (nickname, password) => {
  try {
    const res = await api.post(`/users/register`, { nickname, password });
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const login = async (nickname, password) => {
  try {
    const res = await api.post(`/users/login`, { nickname, password });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const logout = async () => {
  try {
    const res = await api.get(`/users/logout`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};
