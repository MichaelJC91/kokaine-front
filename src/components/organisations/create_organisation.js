import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createOrganisation } from '../../actions/organisations/index';

class CreateOrganisation extends Component {

  renderField(field) {
    const { type, placeholder } = field;
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <input {...field.input} type={type} placeholder={placeholder || ''} className="form-control"/>
        { field.meta.error }
      </div>
    )
  }

  onSubmit(values) {
    this.props.createOrganisation(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return(
      <div>
        <h2>Create New Organisation</h2>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="name"
            label="Organisation Name"
            type="text"
            component={ this.renderField }
            placeholder="Wayne Industries"
          />
          <Field
            name="email"
            label="Organisation Email"
            type="email"
            component={ this.renderField }
            placeholder="batman@thebatcave.com"
          />
          <Field
            name="phone"
            label="Organisation Phone Number"
            type="tel"
            component={ this.renderField }
            placeholder="1300 batman"
          />
          <button type="submit" className="btn btn-primary cursor-pointer">Create New Organisation</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  //validate inputs from values
  if(!values.name) {
    errors.name = 'Please Enter Name';
  }

  if(!values.email) {
    errors.email = 'Please Enter an Email';
  }

  if(!values.phone) {
    errors.phone = 'Please Enter a Phone Number';
  }
}

export default reduxForm({
  form: 'createOrganisation',
  validate
})(
  connect(null, { createOrganisation })(CreateOrganisation)
)
