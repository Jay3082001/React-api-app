import { Navigate, useLocation } from 'react-router-dom';
import { useMemo, useEffect, useRef } from 'react';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const hasWarned = useRef(false);

  // Dynamically check token on every render using useMemo
  const isAuthenticated = useMemo(() => {
    const tokenData = JSON.parse(localStorage.getItem('U_TOKENS'));
    return tokenData && tokenData.jwtToken;
  }, [localStorage.getItem('U_TOKENS')]);

  useEffect(() => {
    if (!isAuthenticated && !hasWarned.current) {
      alert("Login required! Please log in to access this page."); 
      hasWarned.current = true;
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
