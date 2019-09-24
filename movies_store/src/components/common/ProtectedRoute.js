import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
    return (
        <Route
            path={path}
            {...rest}
            render={props => {
                // debugger;
                if (!auth.getCurrentUser())
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location }, // set where user wanted to go
                            }}
                        />
                    );
                return Component ? <Component {...props} /> : render(props);
            }}
        />
    );
};

export default ProtectedRoute;
