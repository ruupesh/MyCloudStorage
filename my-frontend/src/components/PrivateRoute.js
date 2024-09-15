import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext); // Access the auth state from context

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
