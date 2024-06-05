import { Outlet } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import KanbanHeader from './KanbanHeader';
import KanbanSidebar from './KanbanSidebar';
import { getAllProjectsByNickname } from '../../../api/api_project';
import { getBoardsByProjectId } from '../../../api/api_board';
import { MyContext } from './selectedBoard';

// в Outlet будут отрисовываться все остальные компоненты

const KanbanLayout = () => {
  const {
    selectedBoard,
    setSelectedBoard,
    selectedProject,
    setSelectedProject,
    aufUser,
  } = useContext(MyContext);

  const [projectsAPI, setProjectsAPI] = useState([
    {
      project_id: '0',
      owner: 'пользователь 1',
      project_name: 'Проект 1',
      members: ['пользователь 1', 'пользователь 2'],
    },
  ]);

  const [boardAPI, setBoardAPI] = useState([
    {
      board_id: 1,
      project_id: '0',
      board_name: 'доска 1',
    },
  ]);

  const [projects, setProjects] = useState([]);

  const [userNicknames, setUserNicknames] = useState([]);

  const updateProjects = async () => {
    const project = await getAllProjectsByNickname(aufUser);
    const boards = await getBoardsByProjectId(selectedProject);
    setProjectsAPI(project);
    setBoardAPI(boards);
  };

  useEffect(() => {
    updateProjects();
  }, [selectedProject, selectedBoard, aufUser]);

  useEffect(() => {
    const adaptAPItoState = () => {
      const adaptedProjects = projectsAPI.map((project) => ({
        projectId: project.project_id, // Добавление project_id
        projectName: project.project_name,
        desks: boardAPI
          .filter((board) => board.project_id === project.project_id)
          .map((board) => ({
            boardName: board.board_name,
            boardId: board.board_id, // Добавление board_id к каждой доске
          })),
      }));

      const selectedProjects = projectsAPI.find(
        (project) => project.project_id === selectedProject
      );

      const adaptedUserNicknames = selectedProjects
        ? selectedProjects.members
        : [];

      // Update state
      setProjects(adaptedProjects);
      setUserNicknames(adaptedUserNicknames);
    };
    console.log(userNicknames);

    adaptAPItoState();
  }, [projectsAPI, boardAPI]);

  const handleSelectDesk = (deskName) => {};

  return (
    <div>
      <KanbanHeader userNicknames={userNicknames} projects={projects} />{' '}
      {/* Передача выбранной доски в KanbanHeader */}
      <KanbanSidebar
        projects={projects}
        setProjects={setProjects}
        updateProjects={updateProjects}
      />{' '}
      {/* Передача функции для выбора доски */}
      <Outlet />
    </div>
  );
};

export default KanbanLayout;
