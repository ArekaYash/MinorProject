import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.css";

const StudLogin = () => {
  // const { login } = useAuth();
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const [user, setUser] = useState({
    email: "", password: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }
  const LoginData = async(e) =>{
    e.preventDefault();

    const{email,password}=user;
    if (!email.endsWith("@stu.upes.ac.in")) {
      setError("Invalid Email for a Student! Please Try Again!");
      return;
    }

    const res= await fetch("http://localhost:5001/api/students/login",{ 
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,password
      })
    });
    const data = await res.json();
  
    if (data.status === 400 || !data){
      setError("Something went wrong! Please Try Again!");
    }
    else{
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/Students");
    }
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
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
            <button type="submit" onClick={LoginData}>Login</button>
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
