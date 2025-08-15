// src/components/PrivateRoute.jsx

import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ requiredRole }) => {
  const { user } = useSelector((state) => state.auth);

  // Check for the user object first. If it doesn't exist, the user isn't authenticated.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Use optional chaining to safely get the user's role.
  const userRole = user??user.role;

  // If a specific role is required and the user's role does not match, redirect.
  if (requiredRole && userRole !== requiredRole) {
    console.log(`Access denied. User role: ${userRole}, Required role: ${requiredRole}`);

    // Redirect based on the current user's role.
    if (userRole === "admin") {
      return <Navigate to="/bord" replace />;
    } else if (userRole === "client") {
      return <Navigate to="/bords" replace />;
    } else {
      // Fallback for an unknown role.
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // If the user is authenticated and the role matches (or no specific role is required), render the child component.
  return <Outlet />;
};

export default PrivateRoute;