import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const RequiredAuth = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const location = useLocation();
  console.log(isAuthenticated);

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    console.log(isAuthenticated);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
export default RequiredAuth;
