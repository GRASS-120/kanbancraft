import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './acording.css';
import ProjectIcon from '../../../assets/projectIcon.svg';
import SubProjectIcon from '../../../assets/subprojectIcon.svg';

const projects = [
  { projectName: "Проект 1", subprojects: ["Доска 1","Доска 2"] },
  { projectName: "Проект 2", subprojects: ["Доска 1","Доска 2","Доска 3"] },
];

const AccordionDemo = () => (
  <Accordion.Root className="AccordionRoot" type="single" defaultValue="item-1" collapsible>
    {projects.map((project, index) => (
      <Accordion.Item key={index} className="AccordionItem" value={`item-${index + 1}`}>
        <AccordionTrigger>{project.projectName}</AccordionTrigger>
        <AccordionContent>
          <ul>
            {project.subprojects.map((subproject, subIndex) => (
              <li key={subIndex}>
                <AccordionButton>{subproject}</AccordionButton>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </Accordion.Item>
    ))}
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="AccordionHeader">
    <Accordion.Trigger
      className={classNames('AccordionTrigger', className)}
      {...props}
      ref={forwardedRef}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}> {/* Объединение иконки и текста в один flex контейнер */}
        <img src={ProjectIcon} alt="Project Icon" className="ProjectIcon" />
        <span style={{ marginLeft: '8px' }}>{children}</span> {/* Добавление отступа между иконкой и текстом */}
      </div>
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionButton = ({ children }) => (
  <button className="SubprojectButton">
    <img src={SubProjectIcon} alt="Subproject Icon" className="SubProjectIcon" /> {/* Иконка подпроекта */}
    {children}
  </button>
);

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={classNames('AccordionContent', className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));

export default AccordionDemo;