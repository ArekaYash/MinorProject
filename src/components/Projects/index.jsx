import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const postproject = () => {

  }
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/projects/');
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      const projectIds = data.projects;
      const projectDetailsPromises = projectIds.map(projectId =>
        fetchProjectDetails(projectId._id) 
      );
      const projectDetails = await Promise.all(projectDetailsPromises);
      setProjects(projectDetails);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error);
    }
  };
  

  const fetchProjectDetails = async (projectId) => {
    try {
      console.log({projectId});
      const response = await fetch(`http://localhost:5001/api/projects/${projectId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch project details for project ID ${projectId}`);
      }
      const projectData = await response.json();
      const { project_name, members, mentors, coordinators, evaluators } = projectData.project;
      const memberNames = members.map(member => member.name);
      const mentorNames = mentors.map(mentor => mentor.name);
      const coordinatorNames = coordinators.map(coordinator => coordinator.name);
      const evaluatorNames = evaluators.map(evaluator => evaluator.name);
      return {
        _id: projectId,
        project_name,
        members: memberNames,
        mentors: mentorNames,
        coordinators: coordinatorNames,
        evaluators: evaluatorNames
      };
    } catch (error) {
      console.error(`Error fetching project details for project ID ${projectId}:`, error);
      return {};
    }
  };
  
  return (
    <>
      <Navbar isAuthenticated={true} />
      <div className="banner-img">

      <div className="projects">
        
          <div className="title">
            <h2>Projects</h2>
          </div>
        
        <div className="section">
          <div className="page">
            {error ? (
              <div className="card">No projects</div>
            ) : (
              
              projects.map(({ _id, project_name, members, mentors, coordinators, evaluators }) => (
                <div className="list" key={_id}>
                  <div className="card">
                    <div className="name">
                      <div className="detail">
                        <h3>{project_name}</h3>
                        <p>Members: {members && members.join(", ")}</p>
                        <p>Mentors: {mentors && mentors.join(", ")}</p>
                        <p>Coordinators: {coordinators && coordinators.join(", ")}</p>
                        <p>Evaluators: {evaluators && evaluators.join(", ")}</p>
                      </div>
                    </div>
                    <div className="button">
                      <div className="posting">
                        <Link to="/schedule">Schedule</Link>
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))
            )}</div>
        </div>
      </div>
            </div>
    </>
  );
};

export default Projects;
