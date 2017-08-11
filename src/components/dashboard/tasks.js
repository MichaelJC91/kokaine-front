import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Tasks extends Component {
  render() {
    return (
      <h1>Tasks Component</h1>
    )
  }
}

// function mapStateToProps( state ) {
//   return { tasks: state.tasks }
// }

export default connect(null, { })(Tasks);
