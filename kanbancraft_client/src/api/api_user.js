import { api } from './instance';

export const getAllUsers = async () => {
  try {
    const res = await api.get(`/users`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const getUserByNickname = async (nickname) => {
  try {
    const res = await api.get(`/users/${nickname}`);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении GET запроса:', error);
  }
};

export const registration = async (nickname, password) => {
  try {
    const res = await api.post(
      `/register?nickname=${nickname}&password=${password}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const login = async (nickname, password) => {
  try {
    const res = await api.get(
      `/login?nickname=${nickname}&password=${password}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении POST запроса:', error);
  }
};

export const changePassword = async (
  nickname,
  oldPassword,
  newPassword,
  newPasswordRepeat
) => {
  try {
    const res = await api.patch(
      `/users/${nickname}/change_password?old_password=${oldPassword}&new_password=${newPassword}&new_password_repeat=${newPasswordRepeat}`
    );
    return res.data;
  } catch (error) {
    console.error('Ошибка при выполнении PATCH запроса:', error);
  }
};
