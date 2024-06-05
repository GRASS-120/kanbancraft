import React, { createContext, useState } from 'react';

import { registration, login } from '../../../api/api_user';

// Создание контекста и экспорт его для использования в других компонентах
export const MyContext = createContext();

// Создание провайдера контекста в том же файле
export const SelectedBoard = ({ children }) => {
  // Добавление двух переменных состояния
  const [selectedBoard, setSelectedBoard] = useState('1');
  const [selectedProject, setSelectedProject] = useState('1');
  const [aufUser, setAufUser] = useState('rty');

  const [isAuth, setIsAuth] = useState(false);
  const [authUser, setAuthUser] = useState({});

  const realLogin = async (nickname, password) => {
    const res = await login(nickname, password);
    console.log(res);
    setIsAuth(true);
    setAuthUser(res);
  };

  const realReg = async (nickname, password) => {
    const res = await registration(nickname, password);
    console.log(res);
    setIsAuth(true);
    setAuthUser(res);
  };

  const realLogout = async () => {
    setIsAuth(false);
    setAuthUser({});
  };

  // Передача обеих переменных и функций для их обновления в контекст
  return (
    <MyContext.Provider
      value={{
        isAuth,
        authUser,
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
