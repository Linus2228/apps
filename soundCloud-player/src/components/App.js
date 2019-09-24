import React from 'react';
import { Route, Switch } from 'react-router-dom';


import MainPage from './Main/MainPage';
import Profile from './Profile/Profile';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import NotFound from './layout/NotFound';
import Header from './layout/Header';

const App = () => (
  <div>
    <Header />
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  </div>
);

export default App;
