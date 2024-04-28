import React from 'react';
import './index.css'; 
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const FacultyDashboard = () => {
  // const { user } = useAuth();
  
  return (<>
  <Navbar isAuthenticated={true} userRole={'faculty'}/>

  <div className="banner-img">
    <div className='dashboard-container'>
      <h2>Welcome to Faculty Dashboard !!</h2>
        <>
        <br />
        <h3 align="center">View as</h3>
        <div className="button-container">
        <button className='dashboard-button'>
          <Link to="/faculty/academic-coordinator"className='button-text'>Academic Coordinator</Link>
        </button>
          <br></br>
        <button className='dashboard-button'>
          <Link to="/faculty/evaluator"className='button-text'>Evaluator</Link>
        </button>
          <br></br>
        <button className='dashboard-button'>
          <Link to="/faculty/mentor"className='button-text'>Mentor</Link>
        </button>
        </div>
        </>
      
    </div>
      </div>
      </>
  );
};

export default FacultyDashboard;

