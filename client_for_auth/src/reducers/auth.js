import { AUTH_USER, AUTH_EROR } from '../actions/types';

const initialState = {
    authenticated: '',
    errorMessage: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, authenticated: action.payload };
        case AUTH_EROR:
            return { ...state, errorMessage: action.payload };
        default:
        return state;
    }
}