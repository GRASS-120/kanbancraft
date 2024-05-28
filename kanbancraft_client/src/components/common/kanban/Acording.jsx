import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './acording.css';
import ProjectIcon from '../../../assets/projectIcon.svg';
import SubProjectIcon from '../../../assets/subprojectIcon.svg';

import AddDeskDropdown from './AddDesk';

const AccordionComponent = ({ projects, setProjects, onSelectDesk }) => (
  <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
    {projects.map((project, index) => (
      <Accordion.Item key={index} className="AccordionItem" value={`item-${index + 1}`}>
        <AccordionTrigger project={project} setProjects={setProjects} projects={projects} onSelectDesk={onSelectDesk}>
          {project.projectName}
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            <li>
              <AddDeskDropdown projectId={project.id} projects={projects} setProjects={setProjects} />
            </li>
            {project.deskName.map((deskName, subIndex) => (
              <li key={subIndex}>
                <AccordionButton onClick={() => onSelectDesk(deskName)}>{deskName}</AccordionButton> {/* Вызов onSelectDesk при выборе доски */}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(({ children, project, setProjects, onSelectDesk, projects, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger')}
      {...props}
      ref={forwardedRef}
      onClick={() => onSelectDesk(children)}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={ProjectIcon} alt="Project Icon" className="ProjectIcon" />
          <span style={{ marginLeft: '8px' }}>{children}</span>
        </div>
        
      </div>
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionButton = ({ children }) => (
  <button className="SubprojectButton">
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