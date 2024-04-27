import { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddProject = () => {
  const [formData, setFormData] = useState({
    project_name: "",
    members: [],
    domain: "",
    mentors: [],
    coordinators: [],
    evaluator: [],
    // customDomain: "",
  });

  const navigate = useNavigate();

  const handleSubmitButton = async (e) => {
    // async
    e.preventDefault();
    const {
      project_name,
      members,
      domain,
      mentors,
      coordinators,
      evaluator,
      // customDomain,
    } = formData;
    const projectDetails = {
      project_name,
      members,
      domain,
      mentors,
      coordinators,
      evaluator,
    };
    if (!project_name) {
      window.alert("Enter project name");
    } else if (members.length === 0) {
      window.alert("Enter at least one member name");
    }
    //  else if (!domain && !customDomain) {
    //   window.alert("Enter domain");
    // } 
    else if (!mentors) {
      window.alert("Enter mentors name");
    } else if (!coordinators) {
      window.alert("Enter academic coordinator name");
    } else if (!evaluator) {
      window.alert("Enter evaluator name");
    } else {
      try {
        const response = await fetch('http://localhost:5001/api/projects/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ', //figure out this
          },
          body: JSON.stringify(projectDetails),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create project');
        }
        setFormData({
          project_name: "",
          members: [],
          domain: "",
          mentors: [],
          coordinators: [],
          evaluator: [],
        });
        window.alert("Form Submitted Successfully");
        navigate(-1);
      } catch (error) {
        console.error('Error creating project:', error);
        window.alert('Failed to create project. Please try again later.');
      }
    };
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
      {index > 0 && ( 
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
        <form method='POST' >
          <div >
            <label htmlFor="project_name">Project Name</label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              className="form-control"
              placeholder="Enter Project Name"
              value={formData.project_name}
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
            <label htmlFor="mentors">Mentor</label>
            <input
              type="text"
              id="mentors"
              name="mentors"
              className="form-control"
              placeholder="Enter Mentor Name"
              value={formData.mentors}
              onChange={handleChange}
              required
              />
          </div>
          <div >
            <label htmlFor= "coordinators">Academic Coordinator</label>
            <input
              type="text"
              id= "coordinators"
              name= "coordinators"
              className="form-control"
              placeholder="Enter Academic Coordinator Name"
              value={formData.coordinators}
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
            <button type="submit" className="submit-button" onClick={handleSubmitButton}>
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