import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Joi from "joi-browser";
import DjangoCSRFToken from "../../services/getCSRF";
import {toast} from 'react-toastify';
import config from '../../services/config.json'


const RegisterForm = (props) => {
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const params = useParams();


  const schema = Joi.object().keys({
    username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password")
  }).options({ stripUnknown: true });;

  const doSubmit = async () => {
    try {
        const response = await axios.post(config.apiEndpoint + 'users/user_get_post', data);
        console.log(response);
        navigate('/login', { replace: true });
    }
    catch (ex) {
        if (ex.response && ex.response.status === 400)
        // toast.error();
            {toast.error('an account with this username already exists');};
            return;
    };
  };

  

//   useEffect( async () => {
//     // const navigate = useNavigate();
//     // const params = useParams();
//     await populateGenres();
//     await populateMovie();
      
//       // console.log(movie)
//     }
//   , []);

  const handleChange = ({ currentTarget: input }) => {
    const errorsData = { ...errors };
    const newData = { ...data };
    newData[input.name] = input.value;
    // const errorMessage = validateProperty(input);
    // if (errorMessage) errorsData[input.name] = errorMessage;
    // else delete errorsData[input.name];
    setData((prevState) => ({
      ...prevState,
      [input.name]: input.value,
      //   data: newData,
    }));
    // setErrors(errorsData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorsData = validate();
    setErrors(errorsData || {});
    console.log(errorsData);
    if (errorsData) return;

    doSubmit();
  };

  const validate = () => {
    const { error } = schema.validate(
      data,
      { abortEarly: false }
      //   { allowUnknown: true }
    );
    if (!error) return null;

    const errorsData = {};
    for (let item of error.details) errorsData[item.path[0]] = item.message;
    return errorsData;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
      <DjangoCSRFToken />
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            onChange={handleChange}
            value={data.username}
            id="username"
            className="form-control mt-2 mb-2"
          />
          {errors.username && (
            <div className="alert alert-danger">{errors.username}</div>
          )}

          
          <label htmlFor="password">Password</label>
          <input
            name="password"
            onChange={handleChange}
            value={data.password}
            id="password"
            type="password"
            className="form-control mt-2 mb-2"
          />
          {errors.password && (
            <div className="alert alert-danger">{errors.password}</div>
          )}


          <button
            // disabled  attr should be true or false, by passing this.validate,
            // this.validate() returns either null = false or an object = truthy
            className="btn btn-primary"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
