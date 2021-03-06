import React, { Component } from 'react';
import SignupSignInContainer from './signin-signup-container';

export default class LandingPage extends Component {
  render() {
    return(
      <div className="landing-page-container">
        <div className="container landing-page-logo">
          <div className="row">
            <div className="col-md-4 offset-md-4 text-center">
              <h1 className="kokaine-logo">K</h1>
            </div>
          </div>
        </div>
        <SignupSignInContainer />
      </div>
    )
  }
}
