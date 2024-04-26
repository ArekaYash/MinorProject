import React, { useState } from "react";
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

    // const res = await fetch('/routename', {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     email, password
    //   })
    // }
    // )
    const data = await res.json();
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
    if (data.status === 400 || !data){
      setError("Something went wrong! Please Try Again!");
    }
    else{
      window.alert("Login Successful ! ");
      navigate("/faculty");
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
          <form method="POST">
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
            <button type="submit" onClick={handleLogin}>Login</button>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Don't have an account?{" "}
              <a href="/faculty-register" style={{ color: "blue" }}>
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default FacultyLogin;
