import React, { Component } from 'react';
import {Form} from './form';
import Joi from 'joi-browser';
import axios from 'axios';
import DjangoCSRFToken from '../../services/getCSRF';
import {toast} from 'react-toastify';
import Cookies from 'js-cookie';
import config from '../../services/config.json'




class RegisterForm extends Form {
    state = { 
        data: {
            username:'',
            // name:'',
            password:''
        },
        errors: {}

     } 
    //  const usernameRegex = /^[a-zA-Z0-9_]+$/;
     schema = Joi.object().keys({
        // name: Joi.string().required().label("Name"),
        password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .min(8)
        .max(150)      
        .required(),
        // .messages({
        //     'string.base': 'Password must be a string',
        //     'string.empty': 'Password cannot be empty',
        //     'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        //     'string.min': 'Password must be at least {{#limit}} characters long',
        //     'string.max': 'Password must be at most {{#limit}} characters long',
        //     'any.required': 'Password is required'
        //   })
        username: Joi.string().regex(/^[a-zA-Z0-9_]+$/)
        
        .min(4)
        .max(150)
        .required() });
        // .messages({
        //     'string.base': 'Username must be a string',
        //     'string.empty': 'Username cannot be empty',
        //     'string.pattern.base': 'Username can only contain alphanumeric characters and underscores',
        //     'string.min': 'Username must be at least {{4}} characters long',
        //     'string.max': 'Username must be at most {{150}} characters long',
        //     'any.required': 'Username is required'
        //   })   
        
        
    doSubmit = async () => {
        try {
            const response = await axios.post(config.apiEndPoint + 'users/user_get_post', this.state.data);
            console.log(response);
        }
        catch (ex) {
            if (ex.response && ex.response.status === 400)
            // toast.error();
                {toast.error('an account with this username already exists');};
                return;
        };
        // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        // axios.defaults.xsrfCookieName = "csrftoken";
        // const csrfToken = Cookies.get('csrftoken');
        const csrftoken = Cookies.get('csrftoken');
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token', this.state.data, 
            // {
            //     headers: {
            //     // //   'Content-Type': 'application/json',
            //     // //   'Authorization': `Token ${csrfToken}`,
            //     'X-CSRFToken': csrfToken
            //     },
            //   }
              );
              console.log(response)
            localStorage.setItem('token', response.data['access'])
            console.log('submitted');
        } catch (error) {
            console.log('error logging in');
            console.log(error);
        }
    }

    render() { 
        const {data, errors} = this.state
        return (

            <div className='container'>
                <form onSubmit={this.handlaSubmit}>
                <DjangoCSRFToken />
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input name='username' onChange={this.handleChange} value={data.username} id='username' type="text" className="form-control" />
                        {errors.username && <div className="alert alert-danger">{errors.username}</div>}
                        <label htmlFor="password">Password</label>
                        <input name='password' type='password' onChange={this.handleChange} id='password' className="form-control"/></div>
                        {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                        {/* <label htmlFor="name">Name</label>
                        <input name='name' onChange={this.handleChange} value={data.name} id='name' type="text" className="form-control" />
                        {errors.name && <div className="alert alert-danger">{errors.name}</div>} */}
                        <button 
                        // disabled  attr should be true or false, by passing this.validate,
                        // this.validate() returns either null = false or an object = truthy
                            
                            disabled={this.validate()}
                            className='btn btn-primary'>Register</button>
                </form>
            </div>
        );
    }
        
    }
 
export default RegisterForm;