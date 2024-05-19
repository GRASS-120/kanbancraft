import { Outlet } from 'react-router-dom';
import React, { useState } from 'react';
import KanbanHeader from './KanbanHeader';
import KanbanSidebar from './KanbanSidebar';

// в Outlet будут отрисовываться все остальные компоненты

const KanbanLayout = () => {

  const [projects, setProjects] = useState([
    { projectName: "Проект 1", deskName: ["Доска 1", "Доска 2"] },
    { projectName: "Проект 2", deskName: ["Доска 1", "Доска 2", "Доска 3"] },
  ]);

  const [userNicknames, setUserNicknames] = useState([
    { name: 'John Doe', role: 'Программист' },
    { name: 'Jane Smith', role: 'Дизайнер' },
    { name: 'Bob Johnson', role: 'Программист' },
  ]);

  const [selectedDesk, setSelectedDesk] = useState("Проект"); // Состояние для хранения выбранной доски
  console.log(selectedDesk)

  // Добавьте функцию для передачи выбранной доски из аккордеона в KanbanHeader
  const handleSelectDesk = (deskName) => {
    setSelectedDesk(deskName);
    console.log('1')
  };

  return (
    <div>
      <KanbanHeader userNicknames={userNicknames} selectedDesk={selectedDesk} /> {/* Передача выбранной доски в KanbanHeader */}
      <KanbanSidebar projects={projects} setProjects={setProjects} onSelectDesk={handleSelectDesk} /> {/* Передача функции для выбора доски */}
      <Outlet />
    </div>
  );
};

export default KanbanLayout;

