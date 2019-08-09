import React from 'react';
import ReactDOM from "react-dom";
import { Router ,Route, Switch, Redirect } from "react-router-dom";
import history from './history';
import { SignIn, SignUp, ForgotPassword, Dashboard } from './pages';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/forgotpassword" component={ForgotPassword}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route render={ props => <Redirect to={{ pathname: '/signin', state: { from: props.location } }} /> } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
