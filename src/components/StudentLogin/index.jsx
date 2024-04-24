import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

const StudLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.endsWith("@stu.upes.ac.in")) {
      setError("Invalid Email for a Student! Please Try Again!");
      return;
    }
    try {
      await login(email, password);
      setIsAuthenticated(true);
      navigate("/Students");
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Error Logging in. Please Try Again!!");
      setIsAuthenticated(false);
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="banner-img">
        <div>
          <h2 align="center">
            <span> Student Login </span>
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
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
            <button type="submit">Login</button>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Don't have an account?{" "}
              <a href="/stud-register" style={{ color: "blue" }}>
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudLogin;
