import React from 'react'
import { Navigate } from 'react-router-dom';
import { getUser } from "../utils/storage";

const ProtectedRoute = ({ children, role }) => {
  const IsLogIn = localStorage.getItem("IsLogIn");
  const logInUser = getUser();
  if (!IsLogIn) {
    return <Navigate to='/login' />;
  }
  if (role && (!logInUser || !role.includes(logInUser.role))) {
    return <Navigate to="/dashboard" />;
  }
  return children;
}
export default ProtectedRoute;
