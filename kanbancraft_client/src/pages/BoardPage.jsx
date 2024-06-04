import React, { useState, useContext, useEffect } from 'react';
import './boardPage.css';
import '../components/common/kanban/kanban.css';
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '@radix-ui/react-popover';
import Plus from '../assets/plus.svg'
import ellipsis from '../assets/ellipsis.svg'
import { MyContext } from '../components/common/kanban/selectedBoard';
import { getAllColumnsByBoardId, addColumn} from '../api/api_column';
import { getAllTasksByColumnId, addTask, deleteTask, moveTask} from '../api/api_task';
import { deleteColumn, updateColumnColor} from '../api/api_column';
import { Cross2Icon } from '@radix-ui/react-icons';
import ArrowLeft  from '../assets/arrow-left.svg';
import ArrowRight  from '../assets/arrow-right.svg';

const BoardPage = () => {
  const {selectedBoard,setSelectedBoard, selectedProject, setSelectedProject, aufUser} = useContext(MyContext);
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newColumnName, setNewColumnName] = useState('');


  const [columnsAPI, setColumnsAPI] = useState([
    {column_id: 1, board_id: 1, column_name: 'To Do', color: '#9B51E0' },
  ]);

  const [taskAPI, setTaskAPI] = useState([
    {task_id: 1, column_id: 1, description: "ПРЕСС КАЧАТ"},
  ])
// Состояние для хранения выбранной доски

  const [columns, setColumns] = useState([]);

  const updateBoard = async () => {
    setTaskAPI([]);

    const columns = await getAllColumnsByBoardId(selectedBoard);

    setColumnsAPI(columns);

    for (const column of columns) {
      const tasks = await getAllTasksByColumnId(column.column_id);
      setTaskAPI(prevTasks => [...prevTasks, ...tasks]);
    }
  };

  useEffect(() => {
    updateBoard();
  }, [selectedProject, selectedBoard, aufUser]); 

  useEffect(() => {
    const filteredColumns = columnsAPI.filter(column => column.board_id === selectedBoard);
    const updatedColumns = filteredColumns.map(column => {
      return {
        ...column,
        tasks: taskAPI.filter(task => task.column_id === column.column_id).map(task => ({
          description: task.description,
          task_id: task.task_id // Добавляем task_id
        }))
      };
    });
    setColumns(updatedColumns);
  }, [selectedBoard, columnsAPI, taskAPI]);


  const handleChangeColor = async (columnId, newColor) => { 
    console.log(await updateColumnColor(columnId, newColor))
    updateBoard();
  };

  const handleAddColumn = async (newColumnName) => { 
    console.log(await addColumn(selectedBoard, newColumnName))
    updateBoard();
    setNewColumnName("")
  }

  const handleDeleteColumn = async (columnId) => {
    console.log(await deleteColumn(columnId))
    updateBoard();
  };

  const handleAddTask = async (columnId, taskDescription) => {
    if (newTaskDescription!=''){
      console.log(await addTask(columnId, taskDescription))
      setNewTaskDescription('')
      updateBoard();
    }
  };

  const handleDeleteTask = async (taskId) => {
    console.log(await deleteTask(taskId))
    updateBoard();
  }

  const moveTaskLeft = async (taskId, currentColumnId) => {
    // Find the index of the current column
    const currentColumnIndex = columns.findIndex(column => column.column_id === currentColumnId);
    // Check if there is a column to the left
    if (currentColumnIndex > 0) {
      const targetColumnId = columns[currentColumnIndex - 1].column_id;
      try {
        const res = await moveTask(taskId, targetColumnId);
        console.log(res);
        updateBoard();
      } catch (error) {
        console.error('Ошибка при перемещении задачи влево:', error);
      }
    }
  };
  
  const moveTaskRight = async (taskId, currentColumnId) => {
    const currentColumnIndex = columns.findIndex(column => column.column_id === currentColumnId);
    if (currentColumnIndex < columns.length - 1) {
      const targetColumnId = columns[currentColumnIndex + 1].column_id;
      try {
        const res = await moveTask(taskId, targetColumnId);
        console.log(res);
        updateBoard();
      } catch (error) {
        console.error('Ошибка при перемещении задачи вправо:', error);
      }
    }
  };

  return (
    <div className='landing_board'>
      <div className='board'>
        <div className="kanban-board">
          {columns.map((column) => (
            <div key={column.column_id} className='color-kanban' style={{ backgroundColor: column.color }}>
              <div className="kanban-column" style={{ marginTop: "10px" }}>
                <div style={{ marginTop: '20px', marginLeft: "10px", fontSize: '22px', height: "30px", width: "93%", justifyContent: 'space-between', display: 'flex',}}>
                  <h3 >{column.column_name}</h3>
                  <Popover>
                    <PopoverTrigger>
                      <button className="color-picker-btn" ><img src={ellipsis} alt="-" /></button>
                    </PopoverTrigger>
                    <PopoverContent side="right" sideOffset={10}>
                      <PopoverArrow />
                      <div style={{backgroundColor: "#F2F2F2", borderRadius: "10px"}}>
                        <div className="color-picker">
                          <div className="color-option" onClick={() => handleChangeColor(column.column_id, '#DE5959')} style={{ backgroundColor: '#DE5959' }}></div>
                          <div className="color-option" onClick={() => handleChangeColor(column.column_id, '#E8D677')} style={{ backgroundColor: '#E8D677' }}></div>
                          <div className="color-option" onClick={() => handleChangeColor(column.column_id, '#F2994A')} style={{ backgroundColor: '#F2994A' }}></div>
                          <div className="color-option" onClick={() => handleChangeColor(column.column_id, '#8AE38E')} style={{ backgroundColor: '#8AE38E' }}></div>
                          <div className="color-option" onClick={() => handleChangeColor(column.column_id, '#5987DE')} style={{ backgroundColor: '#5987DE' }}></div>
                          <div className="color-option" onClick={() => handleChangeColor(column.column_id, '#8C59DE')} style={{ backgroundColor: '#8C59DE' }}></div>
                        </div>
                        <button 
                        className="delete-button" 
                        onClick={() => {
                          handleDeleteColumn(column.column_id);
                        }}
                      >
                        Удалить
                      </button>
                      </div>
                      
                    </PopoverContent>
                  </Popover>
                </div>


                <Popover>
                  <PopoverTrigger asChild>
                    <button className="add-task-btn" style={{ marginLeft: "10px", marginTop: '10px' }}>
                      <img src={Plus} alt="+" style={{ marginRight: "5px" }} />
                      Добавить запись
                    </button>
                  </PopoverTrigger>
                  <PopoverContent sideOffset={10}>
                  <div className="popover-content">
                    <textarea
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      placeholder="Описание задачи"
                      className="textarea-task"
                    />
                      <button className="buttons-container" onClick={() => handleAddTask(column.column_id, newTaskDescription)}>
                        Подтвердить 
                      </button>
                  </div>

                </PopoverContent>
                </Popover>
                
                  
                <div className="task-container">
                  
                {column.tasks.map((task) => (
                  <div key={task.task_id} className="task" style={{ display: 'flex', alignItems: 'flex-start' }}>
                    {/* Текст задачи слева */}
                    <p style={{ fontSize: '18px', flex: '1' }}>{task.description}</p>
                    {/* Кнопка справа */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <div style={{ width: '34px'}}>
                          <button className="color-picker-btn" style={{ alignSelf: 'flex-start', marginTop:"8px"}}>
                            <img src={ellipsis} alt="menu" />
                          </button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent sideOffset={10} side="right">
                        <div style={{backgroundColor: "#F2F2F2", borderRadius: "10px", paddingTop:"8px"}}>

                        <div className="task-move-container">
                          <button 
                            onClick={() => moveTaskLeft(task.task_id, column.column_id)}
                            className="task-move-button"
                          >
                            <img src={ArrowLeft} alt="Move left" className="arrow-image" />
                          </button>
                          <button 
                            onClick={() => moveTaskRight(task.task_id, column.column_id)}
                            className="task-move-button"
                          >
                            <img src={ArrowRight} alt="Move right" className="arrow-image" />
                          </button>
                        </div>

                          <button 
                            className="delete-button" 
                            onClick={() => handleDeleteTask(task.task_id)}
                          >
                            Удалить
                          </button>
                          
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}

                </div>
              </div>
            </div>
          ))}
          <div className="add-column">

          <Popover>
            <PopoverTrigger asChild>
              <button className="add-column-btn">
                <img src={Plus} alt="-" style={{ marginRight: "5px" }} />
                Добавить колонку
              </button>
            </PopoverTrigger>
            <PopoverContent sideOffset={10}>
              <div className="popover-content">
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="Название колонки"
                  className="input-colum"
                />
                <button className="buttons-container" onClick={() => handleAddColumn(newColumnName)}>
                  Подтвердить
                </button>
              </div>
            </PopoverContent>
          </Popover>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;