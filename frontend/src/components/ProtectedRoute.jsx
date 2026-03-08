import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login while saving the location they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if user has the right role
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to appropriate home based on role
    switch (role) {
      case 'admin':
        return <Navigate to="/admin/home" replace />;
      case 'organizer':
        return <Navigate to="/organizer/home" replace />;
      case 'user':
        return <Navigate to="/user/home" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;

