import { useState } from "react";
import Navbar from "../Navbar";
import "./index.css";
import { useNavigate } from "react-router-dom";

const AddProject = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmitButton = (e) => {
    const signIn = {
      name,
      role,
    };
    e.preventDefault();
    if (name === "") {
      window.alert("Enter group name");
    } else if (role === "") {
      window.alert("Enter domain");
    } else {
      let savedItem = [];
      if (localStorage.getItem("item")) {
        savedItem = JSON.parse(localStorage.getItem("item"));
      }
      localStorage.setItem("item", JSON.stringify([...savedItem, { signIn }]));
      window.alert("Form Submitted Successfully");
      navigate("/Home");
    }
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
            <label id="name-label" htmlFor="name">
              Group Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Domain</label>
            <select
              id="dropdown"
              name="role"
              className="form-control"
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option disabled selected value>
                Topic
              </option>
              <option>Web Development</option>
              <option>CyberSecurity</option>
            </select>
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
