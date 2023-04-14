import React, { Component } from "react";
import Navbar from "./navbar.jsx";
import { Route, Routes, Navigate } from "react-router-dom";
import Movies from "./functionMovies.jsx";
import Customers from "./customers.jsx";
import Pricing from "./pricing.jsx";
import MovieForm from "./functionMovieForm.jsx";
import NotFoundPage from "./common/notFoundPage.jsx";
import LogInForm from "./common/logInForm.jsx";
import LoginForm from "./common/functionLoginForm.jsx";
import "./app.css";
import RegisterForm from "./common/functionRegisterForm.jsx";
import PrivateOutlet from "./common/protectedRoute";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';
import axios from "axios";
import Lougout from "./logout.jsx";
import auth from '../services/authService'
import { useState, useEffect, useCallback } from "react";
import {  useParams, useNavigate, useLocation } from "react-router-dom";
import Profile from "./profile.jsx";



const App = () => {
  
  const [user, setUser] = useState({});
  const location = useLocation();
  useEffect( async () => {
    const currentUser = await auth.getCurrentuser();
    setUser(currentUser);
  }, []);
  return ( 
    <React.Fragment>
        <ToastContainer/>
          <div className="row">
            <div className="col">
              <Navbar user = {user}/>
            </div>
          </div>

          <div>
            <Routes>
            <Route  element={<PrivateOutlet user = {user} />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/movies/:id" element={<MovieForm />} />
            </Route>
            {/* <Route  element={<PrivateOutlet user = {user} />}>
            </Route> */}

            {/* <Route
          path="/movies/:id"
          element={
            <PrivateOutlet user={user}>
              <MovieForm />
            </PrivateOutlet>
          }
        /> */}
      
              {/* <Route path="/movies/:id" element={user ? <MovieForm /> : <LoginForm /> } /> */}
              {/* <Route path='/addMovie' element={<MovieForm />}/> */}
              <Route path="/movies" element={<Movies user = {user} />} />
              <Route path="/customers" element={<Customers />} />
              {/* we use render to pass props to an element, and we make sure to spread the props */}
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/logout" element={<Lougout />} />
              <Route path="/register" element={<RegisterForm />} />
              {/* <Route path='/not-found' element={<NotFoundPage />}/>
            <Route
                    path="/redirect"
                    element={ <Navigate to="/error-page" /> } */}
              {/* /> */}
              <Route path="*" element={<NotFoundPage />} replace />
              <Route path="/" element={<Movies  user = {user}/>} replace />
            </Routes>
          </div>
      </React.Fragment>
    );
  }

   
 
export default App;

// class App extends Component {
//   state = {};

//   async componentDidMount() {
//     const user = await auth.getCurrentuser();
//     this.setState({user});
//   }

//   render() {
//     const {user} = this.state;
//     return (
//       <React.Fragment>
//         <ToastContainer/>
//         <BrowserRouter>
//           <div className="row">
//             <div className="col">
//               <Navbar user = {user}/>
//             </div>
//           </div>

//           <div>
//             <Routes>
//               <Route path="/movies/:id" element={
                
                
//                 user ? <MovieForm /> : <LoginForm /> } />
//               {/* <Route path='/addMovie' element={<MovieForm />}/> */}
//               <Route path="/movies" element={<Movies user = {user} />} />
//               <Route path="/customers" element={<Customers />} />
//               {/* we use render to pass props to an element, and we make sure to spread the props */}
//               <Route path="/pricing" element={<Pricing />} />
//               <Route path="/login" element={<LoginForm />} />
//               <Route path="/logout" element={<Lougout />} />
//               <Route path="/register" element={<RegisterForm />} />
//               {/* <Route path='/not-found' element={<NotFoundPage />}/>
//             <Route
//                     path="/redirect"
//                     element={ <Navigate to="/error-page" /> } */}
//               {/* /> */}
//               <Route path="*" element={<NotFoundPage />} replace />
//               <Route path="/" element={<Movies user = {user}/>} replace />
//             </Routes>
//           </div>
//         </BrowserRouter>
//       </React.Fragment>
//     );
//   }
// }

// export default App;
