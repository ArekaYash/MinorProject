// ProtectedRoute.js
import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  const navigate = useNavigate();
    return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          navigate("/login")
        )
      }
    />
  );
};

export default ProtectedRoute;
