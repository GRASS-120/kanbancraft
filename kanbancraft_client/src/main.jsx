import React from 'react';
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { router } from './Router';
import { SelectedBoard } from './components/common/kanban/selectedBoard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SelectedBoard>
      <RouterProvider router={router} />
    </SelectedBoard>
  </React.StrictMode>
);
