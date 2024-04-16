import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './index.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginType, setLoginType] = useState('');

  const handleLoginTypeSelect = (type) => {
    setLoginType(type);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (loginType === 'faculty') {
      // Navigate to the faculty login page
      navigate('/login-faculty');
    } else if (loginType === 'student') {
      // Navigate to the student login page
      navigate('/login-student');
    }

    setFormData({ email: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="banner-img">
        <div className="title">
          <h3>
            <span>MINOR PROJECT</span> Web Portal
          </h3>
        </div>
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="form-container">
              <div className="button-container">
                <button onClick={() => handleLoginTypeSelect('faculty')}>Faculty Login</button>
                <button onClick={() => handleLoginTypeSelect('student')}>Student Login</button>
              </div>
            </div>
          </form>
      </div>
    </>
  );
};

export default Login;
