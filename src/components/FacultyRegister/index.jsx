import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const FacultyLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState({
    name: "", sap: "", email: "", password: "", cpassword: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user.email.endsWith("@ddn.upes.ac.in")) {
      setError("Invalid Email for a Faculty! Please Try Again!");
      return;
    }
    if (user.password !== user.cpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await login(user.email, user.password);
      setIsAuthenticated(true);
      navigate("/login-faculty");
    } catch (error) {
      setError("Failed to register. Please try again.");
      console.error("Registration Error:", error);
    }
  };
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="banner-img">
        <div className="formcenter">
          <h2 align="center">
            <span>Sign Up </span>{" "}
          </h2>
          <form onSubmit={handleFormSubmit}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputs}
              required
            />
            <label>SAP:</label>
            <input
              type="text"
              name="sap"
              value={user.sap}
              onChange={handleInputs}
              required
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputs}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={user.password}
              autoComplete="off"
              onChange={handleInputs}
              required
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              name = "cpassword"
              value={user.cpassword}
              autoComplete="off"
              onChange={handleInputs}
              required
            />
            {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FacultyLogin;
