import React, { createContext, useState } from 'react';

const [isAuth, setIsAuth] = useState(false);
const [user, setUser] = useState({});

const realLogin = async (nickname, password) => {
  const res = await login(nickname, password);
  localStorage.setItem('token', res.data.accessToken);
  setIsAuth(true);
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
  setUser(res.user);
};
