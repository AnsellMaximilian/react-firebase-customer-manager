import React from "react";
import { Navigate } from "react-router-dom";

export const GuestRoute = ({ children, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};
