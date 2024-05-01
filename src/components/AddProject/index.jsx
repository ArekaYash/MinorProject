import { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate,useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AddProject = () => {
  const location = useLocation();
  console.log("Location state:", location.state); 
  const accessToken = location.state && location.state.accessToken;
  const [formData, setFormData] = useState({
    project_name: "",
    members: [],
    mentors: [],
    coordinators: [],
    evaluators: [],
  });

  const navigate = useNavigate();

  const handleSubmitButton = async (e) => {
    // async
    e.preventDefault();
    const {
      project_name,
      members,
      mentors,
      coordinators,
      evaluators,
    } = formData;
    
    const projectDetails = {
      project_name,
      members,
      mentors,
      coordinators,
      evaluators,
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
    } else if (!evaluators) {
      window.alert("Enter evaluator name");
    } else {
      console.log(projectDetails);
      try {
        const response = await fetch("http://localhost:5001/api/projects/create", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectDetails),
        });
        console.log(response.body);
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to create project');
        }
        setFormData({
          project_name: "",
          members: [],
          mentors: [],
          coordinators: [],
          evaluators: [],
        });
        window.alert("Form Submitted Successfully");
        navigate(-1);
      } catch (error) {
        console.error('Error creating project:', error);
        // window.alert('Failed to create project. Please try again later.');
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
            <label htmlFor="evaluators">Evaluator</label>
            <input
              type="text"
              id="evaluators"
              name="evaluators"
              className="form-control"
              placeholder="Enter Evaluator Name"
              value={formData.evaluators}
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