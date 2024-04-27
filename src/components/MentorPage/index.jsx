import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import "./index.css";

const MentorPage = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const postproject= ()=>{

  }
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/teacher/getMentorProjects'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      setProjects(data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={true} />
      <div className="banner-img">

      <div className="page-container">
        <h2>Mentor Page</h2>
        <p>Welcome, Mentor!</p>
      </div>
      </div>
    </>
  );
};

export default MentorPage;
