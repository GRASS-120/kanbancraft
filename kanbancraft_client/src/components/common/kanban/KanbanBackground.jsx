import React from 'react';
import "../kanban/kanban.css"

const KanbanBackground = ({backgroundIMG}) => {
  return (
    <div className="board-page">
      <img src={backgroundIMG} alt="Description" className="stretch-image"/>
    </div>
  );
};

export default KanbanBackground;