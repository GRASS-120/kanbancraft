import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useState, useContext } from 'react';
import './AddProject.css';
import { addBoard } from '../../../api/api_board';
import { MyContext } from './selectedBoard';

const AddDeskDropdown = ({ projectId,updateProjects}) => {
    const [newDeskName, setNewDeskName] = useState('');
    const {selectedProject,aufUser} = useContext(MyContext);
  
    const addDesk = async (event) => {
      // Предотвращение стандартного поведения формы
    event.preventDefault();
    
    // Вызов API для добавления проекта
    try {
      console.log(await addBoard(selectedProject, newDeskName))
      updateProjects()
      // Обновление состояния проектов
    } catch (error) {
      console.error('Ошибка при добавлении доски:', error);
    }

    // Очистка поля ввода и закрытие выпадающего меню
    setNewDeskName('');
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