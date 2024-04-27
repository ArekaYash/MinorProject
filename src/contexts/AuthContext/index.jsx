import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("accessToken") ? true : false;
  });
  const [user, setUser] = useState(null); 
  
  const login = (accessToken, userData) => {
    localStorage.setItem("accessToken", accessToken);
    setIsAuthenticated(true);
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUser(null); 
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};