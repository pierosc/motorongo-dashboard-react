import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // console.log("getUser");
  const user = JSON.parse(sessionStorage.getItem("user"));
  console.log(user);
  // if (getUser === null || getUser.length === 0) {
  if (user === null || Object.keys(user).length === 0) {
    console.log("goToLogin---NO USER");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
