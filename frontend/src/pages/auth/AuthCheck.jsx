import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AuthCheck = () => {
  const token = Cookies.get("jwt");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to protected routes
  return <Outlet />;
};

export default AuthCheck;
