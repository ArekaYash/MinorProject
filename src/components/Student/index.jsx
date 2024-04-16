import React from 'react';
import Navbar from '../Navbar';
import './index.css'; 
import { useAuth } from '../../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  console.log(user);
  return (
    <>
      <Navbar isAuthenticated={true} userRole={'student'}/>
      <div className="dashboard-container">
        <h2>Student Dashboard</h2>
        <p>Welcome to the Student Dashboard!</p>
        {}
      </div>
    </>
  );
};

export default StudentDashboard;
