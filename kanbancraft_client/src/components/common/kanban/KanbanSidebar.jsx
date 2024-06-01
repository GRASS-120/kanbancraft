import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Используйте useNavigate вместо useHistory
import './kanban.css';
import AccordionComponent from './Acording';
import * as Avatar from '@radix-ui/react-avatar';
import AvatarComponent from './avatar'; 
import avataIMG from '../../../assets/man_icon.jpg';
import AddProjectDropdown from './AddProject';


const KanbanSidebar = ({ projects, setProjects, updateProjects }) => {
  

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

          <div style={{marginLeft: '15px'}}>Мои проекты</div>
          <div style={{marginLeft: '70px'}}>
            <AddProjectDropdown projects={projects} setProjects={setProjects} updateProjects={updateProjects}/>
          </div>

      </div>

      <AccordionComponent projects={projects} setProjects={setProjects} updateProjects={updateProjects} />
    </div>
  );
};

export default KanbanSidebar;