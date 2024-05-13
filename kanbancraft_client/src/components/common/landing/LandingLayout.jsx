import { Outlet } from 'react-router-dom';

import LandingHeader from './LandingHeader';

const LandingLayout = () => {
  return (
    <div className="landing__layout">
      <LandingHeader />
      <Outlet />
    </div>
  );
};

export default LandingLayout;
