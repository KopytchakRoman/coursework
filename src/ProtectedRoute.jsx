import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from './context/AuthContext.jsx';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
