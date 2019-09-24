import React from 'react';
import Joi from 'joi-browser';
import { Redirect } from 'react-router-dom';

import auth from '../services/authService';
import Form from './common/Form';

class LoginForm extends Form {
    state = {
        data: {
            username: '',
            password: '',
        },
        errors: {
            username: '',
            password: '',
        },
    };
    schema = {
        username: Joi.string()
            .min(3)
            .max(30)
            .required()
            .label('User name'),
        password: Joi.string()
            .regex(/^[a-zA-Z0-9]{3,30}$/)
            .required()
            .label('Password'),
    };

    doSubmit = async () => {
        const {
            data: { username: email, password },
            errors,
        } = this.state;
        try {
            await auth.login(email, password);
            const { state } = this.props.location;
            // check if have a route where user wanted to go before successfully loggined to redirect there
            window.location = state ? state.from.pathname : '/'; // reload a page to show existed user data in navbar properly
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const newErrors = { ...errors };
                newErrors.username = error.response.data;
                this.setState({ errors: newErrors });
            }
        }
    };

    render() {
        if (auth.getCurrentUser()) {
            return <Redirect to="/" />;
        }
        const isDisabled = Object.keys(this.validateForm()).length > 0;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSumbit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login', isDisabled)}
                </form>
            </div>
        );
    }
}

export default LoginForm;
