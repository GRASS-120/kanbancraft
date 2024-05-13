import React from 'react';
import { useNavigate } from 'react-router-dom'; // Используйте useNavigate вместо useHistory
import './kanban.css';
import AccordionDemo from './Acording';
import * as Avatar from '@radix-ui/react-avatar';

const KanbanSidebar = () => {
  const navigate = useNavigate(); // Используйте useNavigate для навигации

  // Функция для перехода в директорию kanban/avatar
  const navigateToAvatar = () => {
    navigate('/kanban/account'); // Изменяем текущий путь на /kanban/avatar
  };
  
  return (
    <div className="kanbanSidebar">
      <div className="userGroup" onClick={navigateToAvatar}> 
        <Avatar.Root className="circleAvatar">
          <Avatar.Image src="путь_к_изображению" alt="U" />
          <Avatar.Fallback delayMs={600}>U</Avatar.Fallback>
        </Avatar.Root>
        <div variant="body1" className="username">Мой профиль</div>
      </div>

      <div className="myProject">
        <div className="myProjectText">
          Мои проекты
        </div>
      </div>

      <AccordionDemo />
    </div>
  );
};

export default KanbanSidebar;