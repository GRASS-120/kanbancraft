import React, { useState } from 'react';
import './boardPage.css';
import KanbanBackground from '../components/common/kanban/KanbanBackground';
import backgroundIMG from '../assets/background.jpg';
import '../components/common/kanban/kanban.css';
import { Portal } from '@radix-ui/react-portal';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverClose } from '@radix-ui/react-popover';
import Plus from '../assets/plus.svg'
import ellipsis from '../assets/ellipsis.svg'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Cross2Icon } from '@radix-ui/react-icons';

const BoardPage = () => {
  const [columns, setColumns] = useState([
    { id: 1, title: 'To Do', tasks: ["ПРЕСС КАЧАТ", "т) БЕГИТ", "ТУРНИК", "АНЖУМАНЬЯ ВЕЧЕРОМ"], color: '#9B51E0' },
    { id: 2, title: 'In Progress', tasks: ['Task 4', 'Task 5', 'Task 6'], color: '#2F80ED' },
    { id: 3, title: 'Done', tasks: ['Task 7', 'Task 8', 'Task 9'], color: '#EB5757' },
  ]);

  const handleChangeColor = (columnId, color) => {
    const updatedColumns = columns.map(column => {
      if (column.id === columnId) {
        return { ...column, color: color };
      }
      return column;
    });

    setColumns(updatedColumns);
  };

  return (
    <div className='landing_board'>
      <div className='board'>
        <div className="kanban-board">
          {columns.map((column) => (
            <div key={column.id} className='color-kanban' style={{ backgroundColor: column.color }}>
              <div className="kanban-column" style={{ marginTop: "10px" }}>
                <div style={{ marginTop: '20px', marginLeft: "10px", fontSize: '22px', height: "30px", width: "93%", justifyContent: 'space-between', display: 'flex',}}>
                <h3 >{column.title}</h3>
                <Popover>
                <PopoverTrigger>
                  <button className="color-picker-btn" ><img src={ellipsis} alt="-" /></button>
                </PopoverTrigger>
                <PopoverContent side="right" sideOffset={10}>
                  <PopoverArrow />
                  
                  
                  <div className="color-picker">
                      
                    <div className="color-option" onClick={() => handleChangeColor(column.id, '#DE5959')} style={{ backgroundColor: '#DE5959' }}></div>
                    <div className="color-option" onClick={() => handleChangeColor(column.id, '#E8D677')} style={{ backgroundColor: '#E8D677' }}></div>
                    <div className="color-option" onClick={() => handleChangeColor(column.id, '#F2994A')} style={{ backgroundColor: '#F2994A' }}></div>
                    <div className="color-option" onClick={() => handleChangeColor(column.id, '#8AE38E')} style={{ backgroundColor: '#8AE38E' }}></div>
                    <div className="color-option" onClick={() => handleChangeColor(column.id, '#5987DE')} style={{ backgroundColor: '#5987DE' }}></div>
                    <div className="color-option" onClick={() => handleChangeColor(column.id, '#8C59DE')} style={{ backgroundColor: '#8C59DE' }}></div>
                  </div>

                  
                </PopoverContent>
              </Popover>
                </div>
                <button className="add-task-btn" style={{ marginLeft: "10px", marginTop: '10px' }}>
                  <img src={Plus} alt="-" style={{ marginRight: "5px" }} />
                  Добавить запись
                </button>
                <div className="task-container">
                  {column.tasks.map((task, index) => (
                    <div key={index} className="task">
                      <p style={{ fontSize: '18px' }}>{task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="add-column">
            <button className="add-column-btn">
              <img src={Plus} alt="-" style={{ marginRight: "5px" }} />
              Добавить колонку
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;