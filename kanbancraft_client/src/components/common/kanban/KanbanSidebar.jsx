import React from 'react';
import './kanban.css';
import AccordionDemo from './Acording';


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
        <div variant="body1" className="username">Имя пользователя</div>
      </div>

      <div className="myProject">
        <div className="myProjectText">
          Мои проекты
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
      <AccordionDemo/>
    </div>
  );
};

export default KanbanSidebar;