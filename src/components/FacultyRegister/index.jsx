import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const FacultyLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sap, setSAP] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    // You can add validation logic here if needed

    try {
      await login(email, password);
      setIsAuthenticated(true);
      navigate("/faculty-dashboard");
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
            <span>Sign Up </span>{" "}
          </h2>
          <form onSubmit={handleLogin}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label>SAP:</label>
            <input
              type="text"
              value={sap}
              onChange={(e) => setSAP(e.target.value)}
              required
            />
            <label>Email:</label>
            <input
              type="email"
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
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FacultyLogin;
