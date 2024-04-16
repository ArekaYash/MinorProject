import React, {useEffect} from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();
  console.log('user in PrivateRoute:', user);

  const navigate = useNavigate(); 

  useEffect(() => {
    console.log('PrivateRoute - User:', user);

    if (!user) {
      console.log('PrivateRoute - Redirecting to /login');
      navigate('/login');
    }
  }, [user, navigate]);

  return user ? <Route {...rest} element={<Element />} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
