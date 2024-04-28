import { Outlet } from 'react-router-dom';

import KanbanHeader from './KanbanHeader';
import KanbanSidebar from './KanbanSidebar';

// в Outlet будут отрисовываться все остальные компоненты

const KanbanLayout = () => {
  return (
    <div>
      <KanbanHeader />
      <KanbanSidebar />
      <Outlet />
    </div>
  );
};

export default KanbanLayout;
