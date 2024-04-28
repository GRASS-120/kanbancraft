import { Outlet } from 'react-router-dom';

import LandingHeader from './LandingHeader';

const LandingLayout = () => {
  return (
    <div>
      <LandingHeader />
      <Outlet />
    </div>
  );
};

export default LandingLayout;
