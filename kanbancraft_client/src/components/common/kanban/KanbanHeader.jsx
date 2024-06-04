import React, { useState, useContext } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './KanbanHeader.css';
import avataIMG from '../../../assets/man_icon.jpg';
import AvatarComponent from './avatar';
import { MyContext } from './selectedBoard';
import { inviteUserInProject } from '../../../api/api_project';

const KanbanHeader = ({ userNicknames, projects }) => {
  const { selectedBoard, setSelectedBoard, selectedProject, setSelectedProject } = useContext(MyContext);

  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleInvite = async () => {
    console.log(await inviteUserInProject(name));
    setName('');
  };

  // Находим название проекта по project_id
  const projectName = projects.find(project => project.projectId === selectedProject)?.projectName || '-';
  const boardName = projects
    .flatMap(project => project.desks)
    .find(desk => desk.boardId === selectedBoard)?.boardName || '-';

  return (
    <div className="kanban-header">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div className="avatar">
            {userNicknames.map((nickname, index) => (
              <AvatarComponent
                key={index}
                src={avataIMG}
                alt={nickname}
                size="30px"
              />
            ))}
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Участники проекта {projectName}</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Пригласить участника в проект
            </Dialog.Description>
            <div className="InputContainer">
              <input
                type="name"
                value={name}
                onChange={handleNameChange}
                placeholder="Введите имя участника..."
                className="InputField"
              />
              <button className="ConfirmButton" onClick={handleInvite}>
                Подтвердить
              </button>
            </div>
            <div style={{ marginTop: '25px' }}>Участники проекта</div>
            <div className="ParticipantList">
              {userNicknames.map((nickname, index) => (
                <div key={index} className="ParticipantItem">
                  <AvatarComponent src={avataIMG} alt={nickname} size="30px" />
                  <div className="ParticipantInfo">
                    <div className="ParticipantName">{nickname}</div>
                  </div>
                </div>
              ))}
            </div>
            <Dialog.Close asChild>
              <button className="IconButton" aria-label="Close">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <div className="selectedDesk">
        Проект: {projectName} ⠀⠀⠀Доска: {boardName}
      </div>
    </div>
  );
};

export default KanbanHeader;