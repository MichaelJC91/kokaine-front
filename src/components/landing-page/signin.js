import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { signinUser } from '../../actions/index';
import { connect } from 'react-redux';

class SigninForm extends Component {

  renderField(field) {
    const { type, placeholder } = field;
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <input {...field.input} type={type} placeholder={placeholder || ''} className="form-control"/>
      </div>
    )
  }

  onSubmit(values) {
    this.props.signinUser(values);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signinFormContainer">
        <h2>LOGIN</h2>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="email"
            label="Email"
            component={ this.renderField }
            type="email"
            placeholder="batman@thebatcave.com"
          />
          <Field
            name="password"
            label="Password"
            component={ this.renderField }
            type="password"
          />
          { this.renderAlert() }
          <button action="submit " className="btn btn-secondary">Login</button>
        </form>
        <span><small>Dont Have an Account?</small></span>
        <p><small><Link to="/signup">Sign Up</Link></small></p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signinForm'
})(
  connect(mapStateToProps, {signinUser})(SigninForm)
)
