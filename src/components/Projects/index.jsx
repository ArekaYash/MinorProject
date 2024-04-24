import { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import Project from "../../assets/projects.json";

const Projects = () => {
  const proj = JSON.parse(localStorage.getItem("item")) || [];
  const [filter] = useState([...proj, ...Project]);
  const [active, setActive] = useState(false);
  function saveClick(id, project) {
    window.localStorage.setItem("Project", JSON.stringify(id, project));
    console.log(proj);
  }
  return (
    <>
      <Navbar isAuthenticated={true} />
      <div className="projects">
        <div className="background">
          <div className="title">
            <h2>Projects</h2>
          </div>
        </div>
        <div className="section">
          <div className="page">
            {filter.map(({ id, project, domain }) => {
              return (
                <div className="list" key={id}>
                  <div className="card">
                    <div className="name">
                      <div className="detail">
                        <h3>{project}</h3>
                        <div className="category">
                          <p>{domain}</p>
                        </div>
                      </div>
                    </div>
                    <div className="button">
                      <div className="posting">
                        <Link to="/schedule">Schedule</Link>
                      </div>
                      <div className="save-button">
                        <Link
                          to="/projects"
                          onClick={() => {
                            saveClick(
                              {
                                id,
                                project,
                              },
                              setActive(!active)
                            );
                          }}
                        ></Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
