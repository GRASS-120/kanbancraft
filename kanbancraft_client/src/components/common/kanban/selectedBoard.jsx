import React, { createContext, useState } from 'react';

import { registration, login, logout } from '../../../api/api_user';

// Создание контекста и экспорт его для использования в других компонентах
export const MyContext = createContext();

// Создание провайдера контекста в том же файле
export const SelectedBoard = ({ children }) => {
  // Добавление двух переменных состояния
  const [selectedBoard, setSelectedBoard] = useState('1');
  const [selectedProject, setSelectedProject] = useState('1');
  const [aufUser, setAufUser] = useState('rty');

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const realLogin = async (nickname, password) => {
    const res = await login(nickname, password);
    localStorage.setItem('token', res.data.accessToken);
    setIsAuth(true);
    console.log(res.user);

    setUser(res.user);
  };

  const realLogout = async () => {
    const res = await logout(nickname, password);
    localStorage.removeItem('token');
    setIsAuth(false);
    setUser({});
  };

  const realReg = async (nickname, password) => {
    const res = await registration(nickname, password);
    localStorage.setItem('token', res.data.accessToken);
    setIsAuth(true);
    console.log(res.user);
    setUser(res.user);
  };

  // Передача обеих переменных и функций для их обновления в контекст
  return (
    <MyContext.Provider
      value={{
        isAuth,
        user,
        realLogin,
        realLogout,
        realReg,
        selectedBoard,
        setSelectedBoard,
        selectedProject,
        setSelectedProject,
        aufUser,
        setAufUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
