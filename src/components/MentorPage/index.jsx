import React from 'react';
import Navbar from '../Navbar';
import './index.css'; 

const MentorPage = () => {
  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Mentor Page</h2>
        <p>Welcome, Mentor!</p>
      </div>
    </>
  );
};

export default MentorPage;
