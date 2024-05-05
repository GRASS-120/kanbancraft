import React from 'react';
import backgroundIMG from "../assets/background.jpg";
import "./page.css"; // Import CSS file for styling

const BoardPage = () => {
  return (
    <div className="board-page">
      <img src={backgroundIMG} alt="Description" className="stretch-image"/>
    </div>
  );
};

export default BoardPage;
