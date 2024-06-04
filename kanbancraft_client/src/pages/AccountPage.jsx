import React, { useState, useContext, useEffect } from 'react';
import KanbanBackground from '../components/common/kanban/KanbanBackground';
import backgroundIMG from "../assets/background.jpg"
import './accountPageStyle.css'
import AvatarComponent from '../components/common/kanban/avatar'
import avataIMG from '../assets/man_icon.jpg'
import exitIMG from '../assets/exitIMG.svg'
import passwordType1 from '../assets/passwordType1.png'
import passwordType2 from '../assets/passwordType2.png'
import { MyContext } from '../components/common/kanban/selectedBoard';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

const AccountPage = () => {
  const { aufUser, setAufUser } = useContext(MyContext);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
   
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {

    // Call your function here with the entered data
    console.log('Old password:', oldPassword);
    console.log('New password:', newPassword);
    console.log('Confirm password:', confirmPassword);
  };

  const handleDialogClose = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  useEffect(() => {
    return () => {
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    };
  }, []);

  return (
    <div className='landing_board'>
      <div className='acountConteiner'>
        <button className='exitButton'>
          <img src={exitIMG} />
          Выйти из аккаунта
        </button>

        <div style={{ display: "flex" }}>
          <div>
            <div style={{ transform: 'scaleX(-1)', flex: 1 }}>
              <AvatarComponent src={avataIMG} alt={aufUser} size="123px" />
            </div>
          </div>

          <div>
            <h3 style={{ color: 'black', marginLeft: "5%", fontWeight: 'bold' }}>Имя</h3>
            <div className="InputField">{aufUser}</div>
          </div>
        </div>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className='changePassword'>
              Сменить пароль
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">Смена пароля</Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Меню для смены пароля, укажите старый пароль, чтобы мы могли убедиться, что вы владелец аккаунта
              </Dialog.Description>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="oldPassword">
                  Старый пароль
                </label>
                <input
                  className="Input"
                  id="oldPassword"
                  type={showOldPassword ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                />
                <button
                  className="PasswordToggle"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? (
                  <img src={passwordType1} alt="Hide" width="20" height="20" />
                ) : (
                  <img src={passwordType2} alt="show" width="20" height="20" />
                )}
                </button>
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="username">
                  Новый пароль
                </label>
                <input
                  className="Input"
                  id="username"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <button
                  className="PasswordToggle"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                  <img src={passwordType1} alt="Hide" width="20" height="20" />
                ) : (
                  <img src={passwordType2} alt="show" width="20" height="20" />
                )}
                </button>
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="username">
                  Повторите новый пароль
                </label>
                <input
                  className="Input"
                  id="username"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  className="PasswordToggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                  <img src={passwordType1} alt="Hide" width="20" height="20" />
                ) : (
                  <img src={passwordType2} alt="show" width="20" height="20" />
                )}
                </button>
              </fieldset>
              <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                <Dialog.Close asChild>
                  <button className="Button green" onClick={() => {
                    handleSubmit();
                    handleDialogClose();
                  }}>
                    Подтвердить
                  </button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close" onClick={() => {handleDialogClose()}}>
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default AccountPage;