import { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [projectName, setProjectName] = useState("");
  const [members, setMembers] = useState([]);
  const [domain, setDomain] = useState("");
  const [mentor, setMentor] = useState("");
  const [ac, setAC] = useState("");
  const [evaluator, setEvaluator] = useState("");
  const [customDomain, setCustomDomain] = useState("");

  const navigate = useNavigate();

  const handleSubmitButton = (e) => {
    e.preventDefault();
    if (projectName === "") {
      window.alert("Enter project name");
    } else if (members.length === 0) {
      window.alert("Enter at least one member name");
    } else if (domain === "" && customDomain === "") {
      window.alert("Enter domain");
    } else if (mentor === "") {
      window.alert("Enter mentor name");
    } else if (ac === "") {
      window.alert("Enter academic coordinator name");
    } else if (evaluator === "") {
      window.alert("Enter evaluator name");
    } else {
      const projectDetails = {
        projectName,
        members,
        domain: customDomain || domain,
        mentor,
        ac,
        evaluator,
      };
      let savedProjects = [];
      if (localStorage.getItem("projects")) {
        savedProjects = JSON.parse(localStorage.getItem("projects"));
      }
      localStorage.setItem(
        "projects",
        JSON.stringify([...savedProjects, projectDetails])
      );
      window.alert("Form Submitted Successfully");
      navigate("/Home");
    }
  };

  const handleMemberChange = (e, index) => {
    const updatedMembers = [...members];
    updatedMembers[index] = e.target.value;
    setMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setMembers([...members, ""]);
  };

  return (
    <div>
      <Navbar />
      <div className="background">
        <div className="title">
          <h2>Add Project</h2>
        </div>
      </div>
      <div className="container">
        <form>
          <div className="form-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              className="form-control"
              placeholder="Enter Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="members">Members</label>
            {members.map((member, index) => (
              <input
                key={index}
                type="text"
                className="form-control"
                placeholder={`Member ${index + 1}`}
                value={member}
                onChange={(e) => handleMemberChange(e, index)}
                required
              />
            ))}
            <button type="button" onClick={handleAddMember}>
              Add Member
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="domain">Domain</label>
            <select
              id="domain"
              name="domain"
              className="form-control"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            >
              <option value="">Select Domain</option>
              <option value="Web Development">Web Development</option>
              <option value="CyberSecurity">CyberSecurity</option>
              <option value="Custom" onClick={() => setDomain("")}>
                Custom
              </option>
            </select>
            {domain === "Custom" && (
              <input
                type="text"
                className="form-control"
                placeholder="Enter Custom Domain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                required
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="mentor">Mentor</label>
            <input
              type="text"
              id="mentor"
              name="mentor"
              className="form-control"
              placeholder="Enter Mentor Name"
              value={mentor}
              onChange={(e) => setMentor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ac">Academic Coordinator</label>
            <input
              type="text"
              id="ac"
              name="ac"
              className="form-control"
              placeholder="Enter Academic Coordinator Name"
              value={ac}
              onChange={(e) => setAC(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="evaluator">Evaluator</label>
            <input
              type="text"
              id="evaluator"
              name="evaluator"
              className="form-control"
              placeholder="Enter Evaluator Name"
              value={evaluator}
              onChange={(e) => setEvaluator(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className="submit-button"
              onClick={handleSubmitButton}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProject;
