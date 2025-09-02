// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Change 'spotifyAuthToken' to 'jwt_token' to match your Login component
  const isAuthenticated = localStorage.getItem("jwt_token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
