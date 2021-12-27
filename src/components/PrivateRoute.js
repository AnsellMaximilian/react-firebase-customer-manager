import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" />;
};
