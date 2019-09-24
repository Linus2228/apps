import React from 'react';
import reactDom from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import App from './components/App';
import Feature from './components/Feature';
import reducers from './reducers';

const store = createStore(
    reducers,
    {
        auth: {authenticated: localStorage.getItem('token')}
    },
    composeWithDevTools(applyMiddleware(reduxThunk))
);

reactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <App>
                <Route path="/" exact component={Welcome} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/signout" component={Signout} />
                <Route path="/feature" component={Feature} />
            </App>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
