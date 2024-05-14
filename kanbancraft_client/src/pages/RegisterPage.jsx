import React from 'react';
import { Link } from 'react-router-dom';

import './form.css';

const RegisterPage = () => {
  return (
    <div className="landing">
      <div className="form">
        <div className="form__content">
          <p>Регистрация</p>
          <input type="text" placeholder="Почта" />
          <input type="text" placeholder="Пароль" />
          <input type="text" placeholder="Повторите пароль" />
          <Link to={'/kanban/board'} className="form__btn">
            <button>Зарегистрироваться</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
