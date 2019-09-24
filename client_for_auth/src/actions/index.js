import { AUTH_USER, AUTH_EROR } from './types';
import axios from 'axios';

export const signup = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8080/signup', formProps);
        dispatch({type: AUTH_USER, payload: response.data.token});
        // if we are on feature page and reload the page, we redirect to main page
        // cause our redux store gets empty and has no token
        // so we save token in localStorage
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (error) {
        dispatch({type: AUTH_EROR, payload: 'Email in use'});
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:8080/signin', formProps);
        dispatch({type: AUTH_USER, payload: response.data.token});
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (error) {
        dispatch({type: AUTH_EROR, payload: 'Invalid login credentials'});
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type: AUTH_USER,
        payload: ''
    }
}