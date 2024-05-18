import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import './AddProject.css'; // Импорт стилей

const AddProjectDropdown = ({ projects, setProjects }) => {
  const [newProjectName, setNewProjectName] = useState('');

  const addProject = (event) => {
    const newProject = { projectName: newProjectName, deskName: [] };
    setProjects([...projects, newProject]);
    setNewProjectName(''); // Очистить поле ввода после добавления проекта
    event.target.closest('[data-radix-dropdown-menu-content]').blur(); // Закрыть выпадающее меню
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="trigger-button">+</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="menu-content" side="right">
        <DropdownMenu.Label>Создать проект</DropdownMenu.Label>
        <div className="input-confirm-row">
          <input
            className="input-field"
            type="text"
            placeholder="Название проекта..." // Добавленный атрибут placeholder
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button className="confirm-button" onClick={addProject}>+</button>
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AddProjectDropdown;