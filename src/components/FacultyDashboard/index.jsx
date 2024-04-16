import React from 'react';
import './index.css'; 

import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const FacultyDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h2>Welcome to Faculty Dashboard</h2>
      {user && (
        <>
          <p>User: {user.email}</p>
          <Link to="/faculty/academic-coordinator">Academic Coordinator</Link>
          <Link to="/faculty/evaluator">Evaluator</Link>
          <Link to="/faculty/mentor">Mentor</Link>
        </>
      )}
    </div>
  );
};

export default FacultyDashboard;

