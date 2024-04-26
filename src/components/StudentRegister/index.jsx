import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const StudentLogin = () => {
  // const history = useHistory();
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

  const PostData = async(e) =>{
    e.preventDefault();

    const{name,sap,email,password,cpassword}=user;
    if (!email.endsWith("@stu.upes.ac.in")) {
      setError("Invalid Email for a Student! Please Try Again!");
      return;
    }
    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    const res= await fetch("apitodirect",{ //yaha pe backend ka route daalna hai /register
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,sap,email,password
      })
    });
    const data = await res.json();
    if (data.status === 400 || !data){
      setError("Something went wrong! Please Try Again!");
    }
    else{
      window.alert("Registration Successful ! Login to your Account. ");
      navigate("/login-student");
    }
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="banner-img">
        <div className="formcenter">
          <h2 align="center">
            <span> Sign Up </span>{" "}
          </h2>
          <form method="POST">
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
            <button type="submit" onClick={PostData}>Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
