import React, { useContext, useState} from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './acording.css';
import ProjectIcon from '../../../assets/projectIcon.svg';
import SubProjectIcon from '../../../assets/subprojectIcon.svg';
import AddDeskDropdown from './AddDesk';
import { MyContext } from './selectedBoard';
import ellipsis from '../../../assets/ellipsis.svg'
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from '@radix-ui/react-popover';
import { updateBoardNameById } from '../../../api/api_board';


const AccordionComponent = ({ projects, setProjects,  updateProjects}) => {
  const {selectedProject, selectedBoard, setSelectedBoard, setSelectedProject } = useContext(MyContext);
  const [newBoardName, setNewBoardName] = useState('');
  

  // Обновленная функция onSelectDesk для установки board_id выбранной доски
  const onSelectDesk = (desk, projectId) => {
    setSelectedBoard(desk.boardId); // Теперь устанавливаем board_id
    setSelectedProject(projectId);
    console.log(selectedProject,selectedBoard )
  };

  const handleChangeBoardName = async (columnId, newBoardName) => {
    const boardName = await updateBoardNameById(columnId,newBoardName);
    setNewBoardName('')
    updateProjects()
  };


  return (
    <Accordion.Root className="AccordionRoot" type="single" collapsible>
      {projects.map((project, index) => (
        <Accordion.Item key={index} className="AccordionItem" value={`item-${index + 1}`}>
          <AccordionTrigger project={project} setProjects={setProjects} onSelectDesk={onSelectDesk}>
            {project.projectName}
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>
              
                <AddDeskDropdown projectId={project.projectId} updateProjects={updateProjects}/>
                
              </li>
              {project.desks.map((desk, subIndex) => (
                <li key={subIndex}>
                  <div style={{display:'flex'}}>
                    <AccordionButton desk={desk} projectId={project.projectId} onSelectDesk={onSelectDesk}>
                      {desk.boardName}
                    </AccordionButton>

                    <Popover>
                      <PopoverTrigger asChild>
                        <button className='optionBoard'><img src={ellipsis} alt="-" /></button>
                      </PopoverTrigger>
                      <PopoverContent sideOffset={10} side="right">
                      <PopoverArrow />
                      <div className="menu-content" >
                        <div style={{marginBottom:"10px"}}>Настройки</div> 
                        <input
                          type="text"
                          value={newBoardName}
                          onChange={(e) => setNewBoardName(e.target.value)}
                          placeholder="Название доски"
                          className="input-field"
                          style={{width:"250px", marginBottom:"10px"}}
                        />
                        <button className="buttons-container" onClick={() => handleChangeBoardName(desk.boardId,newBoardName)}>
                          Подтвердить
                        </button>
                      </div>
                      </PopoverContent>
                    </Popover>
                    


                  </div>
                  
                </li>
                
              ))}
            </ul>
          </AccordionContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

// Обновленные компоненты AccordionTrigger и AccordionButton для передачи объекта desk вместо deskName
const AccordionTrigger = React.forwardRef(({ children, project, setProjects, onSelectDesk, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger')}
      {...props}
      ref={forwardedRef}
      onClick={() => {
        if (project.desks && project.desks.length > 0) {
          onSelectDesk("0", project.projectId);
        } else {
          onSelectDesk("0", project.projectId);
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={ProjectIcon} alt="Project Icon" className="ProjectIcon" />
          <span style={{ marginLeft: '8px' }}>{children}</span>
        </div>
        <ChevronDownIcon className="AccordionChevron" aria-hidden />
      </div>
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionButton = ({ children, desk, projectId, onSelectDesk }) => (
  <button
    className="SubprojectButton"
    onClick={() => onSelectDesk(desk, projectId)}
  >
    <img src={SubProjectIcon} alt="Subproject Icon" className="SubProjectIcon" />
    <span style={{ marginLeft: '8px' }}>{children}</span>
  </button>
);

const AccordionContent = React.forwardRef(({ children, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames('AccordionContent')}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));

export default AccordionComponent;