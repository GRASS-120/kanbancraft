import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import './AddProject.css';

const AddDeskDropdown = ({ projectId, projects, setProjects }) => {
    const [newDeskName, setNewDeskName] = useState('');
  
    const addDesk = (event) => {
      event.preventDefault(); // Предотвратить стандартное поведение формы
      if (!newDeskName.trim()) return; // Проверка на пустое имя доски
  
      // Обновляем проект с новой доской, используя projectId для поиска
      const updatedProjects = projects.map(project => {
        if (project.id === projectId) { // Теперь используем id для идентификации проекта
          return { ...project, deskName: [...project.deskName, newDeskName] };
        }
        return project;
      });
  
      setProjects(updatedProjects);
      setNewDeskName(''); // Очистить поле ввода после добавления доски
    };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="trigger-buttonDesk">Добавить доску</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="menu-content" side="right">
        <DropdownMenu.Label>Добавить доску</DropdownMenu.Label>
        <form onSubmit={addDesk} className="input-confirm-row">
          <input
            className="input-field"
            type="text"
            placeholder="Название доски..."
            value={newDeskName}
            onChange={(e) => setNewDeskName(e.target.value)}
          />
          <button type="submit" className="confirm-button">+</button>
        </form>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AddDeskDropdown;