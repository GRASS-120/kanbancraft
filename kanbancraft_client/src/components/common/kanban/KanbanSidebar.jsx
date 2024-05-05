import React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import './kanban.css';

// Define the Subproject component
const Subproject = ({ subprojectName }) => {
  return (
    <div className="subproject" >
      <div style={{ marginLeft: '15%', fontSize: "25px"}}>{subprojectName}</div>
      
    </div>
  );
};

// Define the Project component
const Project = ({ projectName, subprojects }) => {
  return (
    <div className="project" style={{ marginLeft: '10%', fontSize: "25px"}}>
      <div className="projectName">{projectName}</div>

    </div>
  );
};

const KanbanSidebar = () => {
  // Array to store project names
  const projects = [
    { projectName: "где", subprojects: ["ну и", "хуиня"] },
    { projectName: "сковорода", subprojects: ["подпроект3", "подпроект4","ыыыааааа"] },
    // Add more projects and their subprojects as needed
  ];

  return (
    <div className="kanbanSidebar">
      <div className="userGroup">
        <Avatar className="avatar">U</Avatar>
        <div variant="body1" className="username">Имя пользователя</div>
      </div>

      <div className="myProject">
        <div className="myProjectText">
          Мои проекты
          <Button
            variant="contained"
            color="primary"
            style={{ background: 'transparent', boxShadow: 'none', fontSize: '1.7rem', marginLeft: '100px', minWidth: 'auto'}}
            size="small"
          >
            +
          </Button>
        </div>
      </div>

      <div>
        <div style={{ fontSize: "25px"}}>
          {projects.map((project, index) => (
            <div >
              <div className="projectContainer" key={index}>
                  <Project projectName={project.projectName} subprojects={project.subprojects} />
              </div>
                  {project.subprojects.map((subproject, index) => (
                  <div className="subprojectContainer" key={index}>
                  <Subproject subprojectName={subproject} /></div>))}
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KanbanSidebar;