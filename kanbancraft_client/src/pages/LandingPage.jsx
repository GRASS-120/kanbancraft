import React from 'react';
import './other.css';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing">
      <div className="landing__content">
        <h1>
          НАЧИНАЙ <b>КАНБАНКРАФТИТЬ</b>
          <br />
          ПРЯМО <b>СЕЙЧАСЫ</b>
        </h1>
        <Link to={'register'} className="landing__a">
          <button>Зарегестрироваться</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
