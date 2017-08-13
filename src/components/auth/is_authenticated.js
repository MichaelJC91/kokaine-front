import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (this.props.authenticated) {
        this.context.router.history.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if (nextProps.authenticated) {
        this.context.router.history.push('/dashboard');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    console.log(state)
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
