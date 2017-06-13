import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions/index';

class SignOut extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return(
      <h1>You've signed out!</h1>
    )
  }
}

export default connect(null, { signoutUser })(SignOut);
