import React, { useState } from "react";
// import { useAuth } from "../../contexts/AuthContext";
import { useNavigate ,Navigate} from "react-router-dom";
import Navbar from "../Navbar";

const FacultyLogin = () => {
  const navigate = useNavigate();
  // const history = useHistory();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({
    name: "", sap_id: "", email: "", password: "", cpassword: ""
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }

  const PostData = async(e) =>{
    e.preventDefault();
    setIsLoading(true);


    const{name,sap_id,email,password,cpassword}=user;
    if (!email.endsWith("@ddn.upes.ac.in")) {
      setError("Invalid Email for a Faculty! Please Try Again!");
      setIsLoading(false); 
      return;
    }
    if (password !== cpassword) {
      setError("Passwords do not match");
      return;
    }

    const res= await fetch("http://localhost:5001/api/teachers/register",{ 
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,sap_id,email,password
      })
    });
    const data = await res.json();
    if (data.status === 400 || !data){
      setError("Something went wrong! Please Try Again!");
    }
    else{
      window.alert("Registration Successful ! Login to your Account. ");
      navigate("/login-faculty");
    }
    setIsLoading(false); 
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="banner-img">
        <div className="formcenter">
          <h2 align="center">
            <span>Sign Up </span>{" "}
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
            <label>SAP:</label>
            <input
              type="text"
              name="sap_id"
              value={user.sap_id}
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
            <button type="submit" className="button-container" onClick={LoginData} disabled={isLoading}>
              {isLoading ? (
                <span className="button-container">
                     
                  <span className="spinner" />
                       Please wait
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FacultyLogin;
