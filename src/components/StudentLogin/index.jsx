import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

const StudLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    email: "", password: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }
  const LoginData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = user;
    if (!email.endsWith("@stu.upes.ac.in")) {
      setError("Invalid Email for a Student! Please Try Again!");
      setIsLoading(false);
      return;
    }

    const res = await fetch("http://localhost:5001/api/students/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email, password
      })
    });
    const data = await res.json();
    if (!data.accessToken) {
      throw new Error("Access token not received.");
    }
    // login(data.accessToken, data.userData);
    // console.log(data.accessToken);

    if (data.status === 400 || !data) {
      setError("Something went wrong! Please Try Again!");
    }
    else {
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/Students", { state: { accessToken: data.accessToken } });

    }
    setIsLoading(false); 
  }

  return (
    <>
      <Navbar />
      <div className="banner-img">
        <div>
          <h2 align="center">
            <span> Student Login </span>
          </h2>
          <form method="POST">
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
              required
            />
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
            <button type="submit" className="button-container" onClick={LoginData} disabled={isLoading}>
              {isLoading ? (
                <span className="button-container">
                     
                  <span className="spinner" />
                       Please wait
                </span>
              ) : (
                "Login"
              )}
            </button>
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
