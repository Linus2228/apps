import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    onSubmit = (formProps) => {
        this.props.signup(formProps, () => {
            this.props.history.push('/feature');
        });
    }

    render() {
        const { handleSubmit } = this.props; // from redux-form
        return (
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <fieldset>
                    <label>Email</label>
                    <Field
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field
                        name="password"
                        type="password"
                        component="input"
                        autoComplete="none"
                    />
                </fieldset>
                <button>Sign up!</button>
                <span>{this.props.errorMessage}</span>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    errorMessage: state.auth.errorMessage
})

export default compose( // compose allows to use multiple HOC for this component Signup, just clear syntax
    connect(mapStateToProps, actions),
    reduxForm({form: 'signup'})
)(Signup);
