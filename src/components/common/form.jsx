import React, { Component } from 'react';
import Joi from 'joi-browser';


export class Form extends Component {
    state= {
        data: {},
        errors: {}
    }

    handlaSubmit = e => {
        // this prevents the form from doing its default behavior and submit and reload the page
        e.preventDefault();
        const errors = this.validate();
        this.setState({errors: errors || {}})
        if (errors) return null;
        this.doSubmit()
    }

    validateProperty = ({name, value}) => {
        // we make an object of the field information, brackets in [name] is a called computatio notatio inn ES6
        // used to dynamycally set a key from an argument in an object
        const obj = {[name]:value};
        // we have to set a schema for each field, cuz the schema we sat is for validating all form fields
        // this.schema[name] is just fer extracting Joi.string().required().label("Username"), and not having to rewrite it
        let schema = {}
        if (name === 'password') {
            schema = { "password":Joi.string().min(8).required().label("password".charAt(0).toUpperCase() + "password".slice(1))};
        }
        else if (name === 'email') {
            schema = { "email":Joi.string().email({ minDomainSegments: 2 }).required().label("email".charAt(0).toUpperCase() + "email".slice(1))};
        }

        
        else {
            schema = { [name]:Joi.string().required().label(name.charAt(0).toUpperCase() + name.slice(1))};
        };
        // here we validate the obj by the schema, {error} is meant to be result, but we used destructuringon it to directly get 
        // the error property from it
        // and we do not use {abortEarly:false} so we do not recieve many errors at once
        const {error} = Joi.validate(obj, schema);
        return error ? error.details[0].message : null;
    }

    handleChange = ({currentTarget: input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        this.setState({data, errors})   
    }

    validate () {

        const result = Joi.validate(this.state.data, this.schema, {abortEarly:false});
        if (!result.error) return null;

        const errors = {};
        result.error.details.map(item => errors[item.path[0]] = item.message);
        return errors;
        
    }

}

