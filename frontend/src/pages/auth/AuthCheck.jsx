import React from "react";
import { Navigate } from "react-router-dom";

function AuthCheck({ user }) {
  console.log("User:", user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <div></div>;
}

export default AuthCheck;
