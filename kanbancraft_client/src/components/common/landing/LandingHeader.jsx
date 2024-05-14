import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../assets/logo.jpg';
import './header.css';

const LandingHeader = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__logo">
            <img src={logo} alt="Logo" />
            <span>KANBANCRAFT</span>
          </div>
          <nav className="header__entrance__and__registration">
            <ul>
              <Link to={'/login'} className="header__btn">
                Войти
              </Link>
              <Link to={'/register'} className="header__btn">
                Регистрация
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
