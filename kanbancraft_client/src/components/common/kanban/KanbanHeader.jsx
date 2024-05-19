import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './KanbanHeader.css';
import avataIMG from '../../../assets/man_icon.jpg';
import AvatarComponent from './avatar';

const KanbanHeader = ({ userNicknames, selectedDesk }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleInvite = () => {
    // Действия при нажатии на кнопку "Подтвердить"
    console.log('Email:', email);
    // Дополнительные действия, например, отправка запроса на сервер
  };

  return (
    <div className="kanban-header">
      <div className="selectedDesk">
        {selectedDesk}
      </div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <div className="avatar">
            {userNicknames.map((user, index) => (
              <AvatarComponent
                key={index}
                src={avataIMG}
                alt={user.name}
                size="30px"
                role={user.role}
              />
            ))}
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent">
            <Dialog.Title className="DialogTitle">Участники проекта {selectedDesk}</Dialog.Title>
            <Dialog.Description className="DialogDescription">
              Пригласить участника в проект
            </Dialog.Description>
            <div className="InputContainer">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Введите почту участника..."
                className="InputField"
              />
              <button className="ConfirmButton" onClick={handleInvite}>
                Подтвердить
              </button>
            </div>
            <div style={{ marginTop: '25px' }}>Участники проекта</div>
            <div className="ParticipantList">
              {userNicknames.map((user, index) => (
                <div key={index} className="ParticipantItem">
                  <AvatarComponent src={avataIMG} alt={user.name} size="30px" />
                  <div className="ParticipantInfo">
                    <div className="ParticipantName">{user.name}</div>
                    <div className="ParticipantRole">{user.role}</div>
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
    </div>
  );
};

export default KanbanHeader;