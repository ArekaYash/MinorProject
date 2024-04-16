import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email.endsWith('@ddn.upes.ac.in')) {
      // Faculty user
      setUser({ email });
    } else if (email.endsWith('@stu.upes.ac.in')) {
      // Student user
      setUser({ email });
    } else {
      // Invalid user
      setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
  };
  const isAuthenticated = !!user; 

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};