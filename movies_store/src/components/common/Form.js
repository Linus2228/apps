import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './Input';

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validateForm = () => {
        const { data } = this.state;
        const errors = {};
        const options = { abortEarly: false };
        const { error } = Joi.validate(data, this.schema, options);
        if (error) {
            error.details.forEach(item => {
                errors[item.path[0]] = item.message;
            });
        }
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const result = Joi.validate(obj, schema);
        return result.error ? result.error.details[0].message : '';
    };

    handleSumbit = e => {
        e.preventDefault();
        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = [...this.state.errors];
        const errorMessage = this.validateProperty(input);
        if (errorMessage) {
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name];
        }
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton = (label, isDisabled) => (
        <button disabled={isDisabled} className="btn btn-primary">
            {label}
        </button>
    );

    renderInput = (name, label, type) => {
        const { data, errors } = this.state;

        return (
            <Input
                name={name}
                label={label}
                value={data[name]}
                error={errors[name]}
                onChange={this.handleChange}
                type={type}
            />
        );
    };
}

export default Form;
