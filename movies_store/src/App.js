import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import Movies from './components/movies';
import MovieForm from './components/MovieForm';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import Navbar from './components/Navbar';
import NoMatch from './components/common/NoMatch';
import auth from './services/authService';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

class App extends Component {
    state = {};

    componentDidMount() {
        const user = auth.getCurrentUser();
        if (user) {
            this.setState({ user });
        }
    }

    render() {
        const { user } = this.state;
        return (
            <main className="container">
                <ToastContainer />
                <Navbar user={user} />
                <Switch>
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/logout" component={Logout} />
                    <ProtectedRoute path="/movies/:id" component={MovieForm} />
                    <Route
                        path="/movies"
                        render={props => <Movies {...props} user={user} />}
                    />
                    <Route path="/customers" component={Customers} />
                    <Route path="/rentals" component={Rentals} />
                    <Route path="/not-found" component={NoMatch} />
                    <Route exact path="/" component={Movies} />
                    <Redirect to="/not-found" />
                </Switch>
            </main>
        );
    }
}

export default App;
