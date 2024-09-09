import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isVerified, children }) => {
  return isVerified ? children : <Navigate to="/unauthorized" />;
};

export default PrivateRoute;