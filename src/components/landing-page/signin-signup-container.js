import React, { Component } from 'react';
import SignIn from './signin';
import SignUp from './signup';
import {Switch, Route } from 'react-router-dom';


export default class SignupSignInContainer extends Component {

  handleFormSubmit({ email, password }) {
    console.log(email, password)
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center">
            <div className="landing-page-component-wrapper">
              <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/" component={ SignIn }/>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
