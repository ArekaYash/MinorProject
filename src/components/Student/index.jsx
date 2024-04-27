import React from 'react';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';
import './index.css'; 
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddProject = () => {
    navigate("/add-project", { state: { accessToken: localStorage.getItem("accessToken") } }); 
  };
  return (
    <>
      <Navbar isAuthenticated={true} userRole={'student'}/>
      <div className="banner-img">

      <div className="dashboard-container">
        <h2>Student Dashboard</h2>
        <p>Welcome to the Student Dashboard!</p>
        <button onClick={handleAddProject}>Add Project</button>
      </div>
      </div>
    </>
  );
};

export default StudentDashboard;
