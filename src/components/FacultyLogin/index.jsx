import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

const FacultyLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@ddn.upes.ac.in")) {
      setError("Invalid Email for a Faculty! Please Try Again!");
      return;
    }
    try {
      await login(email, password);
      setIsAuthenticated(true);
      navigate("/faculty");
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Error Logging in. Please try again!!");
      setIsAuthenticated(false);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="banner-img">
        <div className="formcenter">
          <h2 align="center">
            <span> Faculty Login </span>{" "}
          </h2>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

export default FacultyLogin;
