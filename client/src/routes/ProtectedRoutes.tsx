import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  loggedIn: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  loggedIn,
  children,
}) => {
  return loggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
