import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/index';

class SignUpForm extends Component {

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
    this.props.signupUser(values);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return(
        <div className="alert alert-danger">
          <strong>{ this.props.errorMessage }</strong>
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signupFormContainer">
        <h2>SIGNUP</h2>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="name"
            label="Name"
            component={ this.renderField }
            type="text"
            placeholder="Bruce Wayne"
          />
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
          <button action="submit " className="btn btn-secondary">Signup</button>
        </form>
        <span><small>Already Have an Account?</small></span>
        <p><small><Link to="/">Signin</Link></small></p>
      </div>
    )
  }
}

//Make the state available in this component
function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

export default reduxForm({
  form: 'signupForm'
})(
  connect(mapStateToProps, { signupUser })(SignUpForm)
)
