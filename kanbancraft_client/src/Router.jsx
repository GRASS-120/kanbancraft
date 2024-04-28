import { createBrowserRouter, redirect } from 'react-router-dom';

import LandingLayout from './components/common/landing/LandingLayout';
import KanbanLayout from './components/common/kanban/KanbanLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import BoardPage from './pages/BoardPage';

// Для того, чтобы внутри приложения работали компоненты из react-router-dom, нужно обернуть приложение
// в контекст роутера (<BrowserRouter>). Однако этот компонент изначально возвращает только те компоненты, которые он
// рендерит по заданному урлу => не понятно, как отрисовывать общие компоненты по типу header и footer. Для решения
// этой проблемы нужно создать родительский роут, который будет отрисовывать общие компоненты (<RouterLayout>) + все
// то, что будут отрисовывать дочерние роуты (все роутеры приложения) для каждого урла (<Outlet>).

export const router = createBrowserRouter([
  {
    path: '/landing',
    element: <LandingLayout />,
    // ! тут будет проверка на то, авторизован ли пользователь
    loader: async () => {
      return null;
    },
    children: [
      {
        path: '',
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/kanban',
    element: <KanbanLayout />,
    children: [
      {
        path: 'board',
        element: <BoardPage />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
    ],
    // ? нужна страница для модалки приглашения
    // ? для каждого проекта и доски параметры?
  },
]);
