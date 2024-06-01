import React, { createContext, useState } from 'react';

// Создание контекста и экспорт его для использования в других компонентах
export const MyContext = createContext();

// Создание провайдера контекста в том же файле
export const SelectedBoard = ({ children }) => {
  // Добавление двух переменных состояния
  const [selectedBoard, setSelectedBoard] = useState("1");
  const [selectedProject, setSelectedProject] = useState("1");
  const [aufUser, setAufUser] = useState("rty");
  
  // Передача обеих переменных и функций для их обновления в контекст
  return (
    <MyContext.Provider value={{ selectedBoard, setSelectedBoard, selectedProject, setSelectedProject, aufUser, setAufUser }}>
      {children}
    </MyContext.Provider>
  );
};