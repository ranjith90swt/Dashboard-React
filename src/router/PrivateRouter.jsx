import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem('user'); // or localStorage

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
