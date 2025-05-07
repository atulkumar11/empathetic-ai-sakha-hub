
import React from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
  // In a real application, you would handle login logic here
  return <Navigate to="/welcome-back?returnTo=lastPage" replace />;
};

export default Login;
