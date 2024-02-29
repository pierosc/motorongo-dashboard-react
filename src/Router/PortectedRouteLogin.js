import React from "react";
import { Navigate } from "react-router-dom";

const PortectedRouteLogin = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  // console.log(user);
  if (user !== null && Object.keys(user)?.length !== 0) {
    // if (true) {
    // console.log(user);
    // console.log("user exists -goto/");
    // console.log(getUser?.length);
    return <Navigate to="/" />;
  }
  return children;
};

export default PortectedRouteLogin;
