import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import './acording.css';

const projects = [
  { projectName: "где", subprojects: ["ну и", "хуиня"] },
  { projectName: "сковорода", subprojects: ["подпроект3", "подпроект4","ыыыааааа"] },
  // Add more projects and their subprojects as needed
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
      {children}
      <ChevronDownIcon className="AccordionChevron" aria-hidden />
    </Accordion.Trigger>
  </Accordion.Header>
));

const AccordionButton = ({ children }) => (
  <button className="AccordionButton">{children}</button>
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
