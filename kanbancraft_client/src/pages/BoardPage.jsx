import React from 'react';
import "./page.css"; 
import KanbanBackground from '../components/common/kanban/KanbanBackground';
import backgroundIMG from "../assets/background.jpg"

const BoardPage = () => {
  return (
    <div>
      <KanbanBackground backgroundIMG={backgroundIMG} />
      
    </div>
  );
};

export default BoardPage;
