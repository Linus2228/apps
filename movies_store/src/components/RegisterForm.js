import React from 'react';
import Joi from 'joi-browser';

import { register } from '../services/userService';
import auth from '../services/authService';
import Form from './common/Form';

class RegisterForm extends Form {
    state = {
        data: {
            email: '',
            password: '',
            name: '',
        },
        errors: {
            email: '',
            password: '',
            name: '',
        },
    };
    schema = {
        email: Joi.string()
            .email({ minDomainAtoms: 2 })
            .required()
            .label('Email'),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .required()
            .min(5)
            .label('Password'),
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            .label('Name'),
    };

    doSubmit = async () => {
        const { data, errors } = this.state;
        try {
            const result = await register(data);
            auth.loginWithJWT(result.headers['x-auth-token']);
            window.location = '/'; // reload a page to show existed user data in navbar properly
            console.log(result);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const newErrors = { ...errors };
                newErrors.email = error.response.data;
                this.setState({ errors: newErrors });
            }
        }
    };

    render() {
        const isDisabled = Object.keys(this.validateForm()).length > 0;
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSumbit}>
                    {this.renderInput('email', 'Email')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderInput('name', 'Name')}
                    {this.renderButton('Login', isDisabled)}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
