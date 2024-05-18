import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Используйте useNavigate вместо useHistory
import './kanban.css';
import AccordionComponent from './Acording';
import * as Avatar from '@radix-ui/react-avatar';
import AvatarComponent from './avatar'; 
import avataIMG from '../../../assets/man_icon.jpg';
import AddProjectDropdown from './AddProject';


const KanbanSidebar = ({ projects, setProjects, onSelectDesk }) => {
  

  const navigate = useNavigate();

  const navigateToAvatar = () => {
    navigate('/kanban/account');
  };


  
  return (
    <div className="kanbanSidebar">
      <div className="userGroup" onClick={navigateToAvatar}> 
      <AvatarComponent src={avataIMG} alt="U" size="45px" />
        <div variant="body1" className="username">Мой профиль</div>
      </div>

      <div className="myProject">

          <dic style={{marginLeft: '15px'}}>Мои проекты</dic>
          <div style={{marginLeft: '70px'}}>
            <AddProjectDropdown projects={projects} setProjects={setProjects} />
          </div>

      </div>

      <AccordionComponent projects={projects} setProjects={setProjects} onSelectDesk={onSelectDesk} />
    </div>
  );
};

export default KanbanSidebar;