import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState, useContext } from 'react';
import './AddProject.css';
import { MyContext } from './selectedBoard';
// Импорт функции API для добавления проекта
import { addProject} from '../../../api/api_project';

const AddProjectDropdown = ({ projects, setProjects, nickname, updateProjects }) => {
  const [newProjectName, setNewProjectName] = useState('');
  const {aufUser} = useContext(MyContext);

  // Функция для добавления нового проекта
  const addProjectAPI = async (event) => {
    // Предотвращение стандартного поведения формы
    event.preventDefault();
    
    // Вызов API для добавления проекта
    try {
      const projectData = await addProject(aufUser, newProjectName);
      updateProjects()
      // Обновление состояния проектов
    } catch (error) {
      console.error('Ошибка при добавлении проекта:', error);
    }

    // Очистка поля ввода и закрытие выпадающего меню
    setNewProjectName('');
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="trigger-button">+</button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="menu-content" side="right">
        <DropdownMenu.Label>Создать проект</DropdownMenu.Label>
        <form onSubmit={addProjectAPI} className="input-confirm-row">
          <input
            className="input-field"
            type="text"
            placeholder="Название проекта..."
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <button type="submit" className="confirm-button">+</button>
        </form>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AddProjectDropdown;