import React, { Component } from 'react';
import Joi from 'joi-browser';
import {Form as MyForm}  from './form';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';

class LogInForm extends MyForm {
    state = {
        data : {username: '',
    password: ''},
    errors: {}
    };

    schema = Joi.object().keys({
        username: Joi.string().required().label("Username"),
        password: Joi.string().min(8).required().label("Password")
      });

      
    doSubmit = async () => {
        try {
            await axios.post('http://127.0.0.1:8000/api/token/', this.state.data);
            console.log('submitted');
            
        }
        catch (ex) {
            console.log('login failed')
        }
    };

    
    render() { 
        const {data, errors} = this.state
        console.log(data)
        return (
            <div className='d-flex align-items-center vh-100'>
                <Form onSubmit={this.handlaSubmit} className="mx-auto">
                <h1 className="text-center mb-4">Login</h1>
                    <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>                        
                    <Form.Control name='username' placeholder="Enter username" onChange={this.handleChange} value={data.username}  type="text" className="form-control" />
                        {errors.username && <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>}
                        
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                        <Form.Control name='password' placeholder="Enter password" type='password' onChange={this.handleChange}  className="form-control" />
                        {errors.password &&  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                        </Form.Group>
                        <Button variant="primary" style={{ marginTop: "1rem" }}
                        // disabled  attr should be true or false, by passing this.validate,
                        // this.validate() returns either null = false or an object = truthy
                            disabled={false}
                            className='btn btn-primary'>Login</Button>
                </Form>
            </div>
        );
    }
}

// ******* the methods below were extracted to a reusablr form cimponent wchich this loginForm is inheriting from ********

// handlaSubmit = e => {
//     // this prevents the form from doing its default behavior and submit and reload the page
//     e.preventDefault();
//     const errors = this.validate();
//     this.setState({errors: errors || {}})
//     if (errors) return null;
//     this.doSubmit()
// }

// validateProperty = ({name, value}) => {
//     // we make an object of the field information, brackets in [name] is a called computatio notatio inn ES6
//     // used to dynamycally set a key from an argument in an object
//     const obj = {[name]:value};
//     // we have to set a schema for each field, cuz the schema we sat is for validating all form fields
//     // this.schema[name] is just fer extracting Joi.string().required().label("Username"), and not having to rewrite it
//     let schema = {}
//     if (name === 'password') {
//         schema = { "password":Joi.string().min(8).required().label("password".charAt(0).toUpperCase() + "password".slice(1))};
//     }
//     else {
//         schema = { [name]:Joi.string().required().label(name.charAt(0).toUpperCase() + name.slice(1))};
//     };
//     // here we validate the obj by the schema, {error} is meant to be result, but we used destructuringon it to directly get 
//     // the error property from it
//     // and we do not use {abortEarly:false} so we do not recieve many errors at once
//     const {error} = Joi.validate(obj, schema);
//     return error ? error.details[0].message : null;
// }
// handleChange = ({currentTarget: input}) => {
//     const data = {...this.state.data};
//     data[input.name] = input.value;
//     const errors = {...this.state.errors};
//     const errorMessage = this.validateProperty(input);
//     if (errorMessage) errors[input.name] = errorMessage;
//     else delete errors[input.name];
//     this.setState({data, errors})

// }
// validate () {

//     const result = Joi.validate(this.state.data, this.schema, {abortEarly:false});
//     if (!result.error) return null;

//     const errors = {};
//     result.error.details.map(item => errors[item.path[0]] = item.message);
//     return errors;
    
// }



export default LogInForm;