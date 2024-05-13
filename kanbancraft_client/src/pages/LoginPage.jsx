import React from 'react';
import { Link } from 'react-router-dom';

import './form.css';

const LoginPage = () => {
  return (
    <div className="landing">
      <div className="form">
        <div className="form__content">
          <p>Регистрация</p>
          <input type="text" placeholder="Почта" />
          <input type="text" placeholder="Пароль" />
          <Link to={'/kanban/board'} className="form__btn">
            <button>Войти</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
