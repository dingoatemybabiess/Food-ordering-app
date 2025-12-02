// src/components/PrivateRoute.jsx
import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // If not logged in, kick them to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If logged in, show the protected page
  return children;
};

export default PrivateRoute;