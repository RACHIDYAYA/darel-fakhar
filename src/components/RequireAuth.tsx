import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const RequireAuth: React.FC<{ children: React.ReactElement; roles?: import('@/contexts/AuthContext').Role[] }> = ({ children, roles }) => {
  const { user, loading, hasRole } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }

  if (roles && !hasRole(roles)) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};

export default RequireAuth;
