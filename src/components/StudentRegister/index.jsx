import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const StudentLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user.email.endsWith("@stu.upes.ac.in")) {
      setError("Invalid Email for a Student! Please Try Again!");
      return;
    }
    if (user.password !== user.cpassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await login(user.email, user.password);
      setIsAuthenticated(true);
      navigate("/login-student");
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
            <span> Sign Up </span>{" "}
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
            <label>SAP ID:</label>
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
              onChange={handleInputs}
              autoComplete="off"
              required
            />
            <label>Confirm Password:</label>
            <input
              type="password"
              name="cpassword"
              value={user.cpassword}
              onChange={handleInputs}
              autoComplete="off"
              required
            />
            {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
