import React from 'react'
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import auth from '../services/authService.js'
import { useState, useEffect, useCallback } from "react";


const Profile = () => {
    const [user, setUser] = useState({});
  useEffect( async () => {
    const currentUser = await auth.getCurrentuser();
    setUser(currentUser);
  }, []);
    return ( 
        <div className='container'>
            <h1>This Is {user.username}'s Profile</h1>
        </div>
     );
}
 
export default Profile;