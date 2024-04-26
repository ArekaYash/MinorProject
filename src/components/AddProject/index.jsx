import { useState } from "react";
// import axios from 'axios';
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    members: [],
    domain: "",
    mentor: "",
    ac: "",
    evaluator: "",
    customDomain: "",
  });

  const navigate = useNavigate();

  const handleSubmitButton = (e) => {
    // async
    e.preventDefault();
    const {
      projectName,
      members,
      domain,
      mentor,
      ac,
      evaluator,
      customDomain,
    } = formData;

    if (!projectName) {
      window.alert("Enter project name");
    } else if (members.length === 0) {
      window.alert("Enter at least one member name");
    } else if (!domain && !customDomain) {
      window.alert("Enter domain");
    } else if (!mentor) {
      window.alert("Enter mentor name");
    } else if (!ac) {
      window.alert("Enter academic coordinator name");
    } else if (!evaluator) {
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
      let savedProjects = JSON.parse(localStorage.getItem("projects")) || [];
      localStorage.setItem(
        "projects",
        JSON.stringify([...savedProjects, projectDetails])
      );
      window.alert("Form Submitted Successfully");
      navigate("/Home");
      // try {
      //   // Send POST request to backend server
      //   const response = await axios.post('https://your-backend-api.com/projects', projectDetails);
    
      //   // Handle success response
      //   console.log("Project details submitted successfully:", response.data);
      //   window.alert("Project details submitted successfully");
      //   navigate("/Home");
      // } catch (error) {
      //   // Handle error
      //   console.error("Error submitting project details:", error);
      //   window.alert("Failed to submit project details. Please try again later.");
      // }
    
      //use fetch method also
      // try {
      //   const response = await fetch('your_backend_endpoint', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(projectDetails),
      //   });
    
      //   if (!response.ok) {
      //     throw new Error('Network response was not ok');
      //   }
    
      //   const responseData = await response.json();
      //   console.log('Project details sent successfully:', responseData);
    
      //   // Handle any further actions after successful submission (e.g., redirecting the user)
      //   window.alert("Form Submitted Successfully");
      //   navigate("/Home");
      // } catch (error) {
      //   console.error('Error sending project details to backend:', error);
      //   window.alert('An error occurred while submitting the form. Please try again later.');
      // }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMemberChange = (e, index) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = e.target.value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleAddMember = () => {
    if (formData.members.length<4){
      setFormData({ ...formData, members: [...formData.members, ""] })
    }
    else{
      window.alert("cannot add more members")
    }
  };
  const handleRemoveMember = (index) => {
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData({ ...formData, members: updatedMembers });
  };
  
  const renderMemberInputs = () => {
    return formData.members.map((member, index) => (
      <div key={index} className="member-input">
      <input
        type="text"
        className="form-control"
        placeholder={`Member ${index + 1}`}
        value={member}
        onChange={(e) => handleMemberChange(e, index)}
        required
      />
      {index > 0 && ( // Allow removing only for additional members (not the first one)
        <button
          type="button"
          className="remove-btn"
          onClick={() => handleRemoveMember(index)}
        >
          Remove
        </button>
      )}
    </div>
    ));
  };

  return (
    <div>
      <Navbar isAuthenticated={true} />

      <div className="banner-img" >
      <div className="background">
        <div className="title">
          <h2>Add Project</h2>
        </div>
      </div>
      <div >
        <form onSubmit={handleSubmitButton}>
          <div >
            <label htmlFor="projectName">Project Name</label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              className="form-control"
              placeholder="Enter Project Name"
              value={formData.projectName}
              onChange={handleChange}
              required
              />
          </div>
          <div>
            <label htmlFor="members">Members</label>
            {renderMemberInputs()}
            {formData.members.length < 4 && (
              <button type="button" className="addbutton" onClick={handleAddMember}>
                Add Member
              </button>
            )}
          </div>
          <div >
            <label htmlFor="domain">Domain</label>
            <select
              id="domain"
              name="domain"
              className="form-control"
              value={formData.domain}
              onChange={handleChange}
              required
              >
              <option value="">Select Domain</option>
              <option value="Web Development">Web Development</option>
              <option value="CyberSecurity">CyberSecurity</option>
              <option value="Custom">Custom</option>
            </select>
            {formData.domain === "Custom" && (
              <input
              type="text"
              className="form-control"
              placeholder="Enter Custom Domain"
              value={formData.customDomain}
              onChange={handleChange}
              required
              />
            )}
          </div>
          <div >
            <label htmlFor="mentor">Mentor</label>
            <input
              type="text"
              id="mentor"
              name="mentor"
              className="form-control"
              placeholder="Enter Mentor Name"
              value={formData.mentor}
              onChange={handleChange}
              required
              />
          </div>
          <div >
            <label htmlFor="ac">Academic Coordinator</label>
            <input
              type="text"
              id="ac"
              name="ac"
              className="form-control"
              placeholder="Enter Academic Coordinator Name"
              value={formData.ac}
              onChange={handleChange}
              required
              />
          </div>
          <div >
            <label htmlFor="evaluator">Evaluator</label>
            <input
              type="text"
              id="evaluator"
              name="evaluator"
              className="form-control"
              placeholder="Enter Evaluator Name"
              value={formData.evaluator}
              onChange={handleChange}
              required
              />
          </div>
          <div >
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
              </div>
      </div>
    </div>
  );
};

export default AddProject;