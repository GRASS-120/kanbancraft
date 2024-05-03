import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './kanban.css';

const KanbanSidebar = () => {
  return (
    <div className="kanbanSidebar">
      <div className="userGroup">
        <Avatar className="avatar">U</Avatar>
        <div variant="body1" className="username">Имя пользователя</div>
      </div>
      <div className="myProject">
        <div className="myProjectText">Мои проекты
          <Button
            variant="contained"
            color="primary" 
            style={{ background: 'transparent', boxShadow: 'none', fontSize: '1.7rem', marginLeft: '100px', minWidth: 'auto'}}
            size="small"
            >+</Button>
        </div>
      </div>
    </div>
  );
};

export default KanbanSidebar;