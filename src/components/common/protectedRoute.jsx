import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import auth from '../../services/authService'
import {  useParams, useNavigate, useLocation } from "react-router-dom";
import LoginForm from "./functionLoginForm.jsx";
import { useEffect, useState } from 'react';


// const [user, setUser] = useState({});
// useEffect( async () => {
//   const currentUser = await auth.getCurrentuser();
//   setUser(currentUser);
// }, []);
function  PrivateOutlet(user, children) {
  const location = useLocation();

  if (!user.user) {
    // console.log(user)
    // return <Navigate to={'/login'} replace />;
    return <Navigate to="/login" state= {{ from: location }} replace={true} />;
  }
  // console.log(user)

  // return children;
  // console.log(user)
  return (
    <Outlet />
    // user ? <Outlet /> : <Navigate to={{ pathname: "/login", state: { from: location } }} />
    )
}

export default PrivateOutlet;