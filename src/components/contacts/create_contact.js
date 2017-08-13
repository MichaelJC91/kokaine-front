import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { createContact } from '../../actions/contacts/index';
import { getAllOrgs, attachContact } from '../../actions/organisations/index';
import _ from 'lodash';

class CreateContact extends Component {

  componentWillMount() {
    this.props.getAllOrgs()
  }

  renderField(field) {
    const { type, placeholder } = field;
    const { meta: { touched, error } } = field;
    const helpText = `form-group ${ touched && error ? 'has-danger' : ''}`
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <input {...field.input} type={type} placeholder={placeholder || ''} className="form-control"/>
        <div className="danger-text">
          { touched ? error : '' }
        </div>
      </div>
    )
  }

  onSubmit(values) {
    const { organisationID } = values;

    if(!organisationID) {
      this.props.createContact(values);
    } else {
      this.props.attachContact(values);
    }
  }

  render() {

    const { handleSubmit } = this.props;

    return(
      <div>
        <h2>Create New Contact</h2>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="name"
            label="Name"
            type="text"
            component={ this.renderField }
            placeholder="Bruce Wayne"
          />
          <Field
            name="email"
            label="Email"
            type="email"
            component={ this.renderField }
            placeholder="batman@thebatcave.com"
          />
          <Field
            name="phone"
            label="Phone Number"
            type="tel"
            component={ this.renderField }
            placeholder="1300 batman"
          />
          <div className="form-group">
            <label>Select Organisation:</label>
            <div>
              <Field name="organisationID" component="select" className="form-control">
                <option/>
                { _.map(this.props.orgs, org => {
                  return (
                    <option key={ org.id } value={ org.id } >{ org.name }</option>
                  )
                }) }
              </Field>
            </div>
          </div>
          <button type="submit" className="btn btn-primary cursor-pointer">Create New Contact</button>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {};

  //validate inputs from values
  if(!values.name) {
    errors.name = 'Please Enter a Name';
  }

  if(!values.email) {
    errors.email = 'Please Enter an Email';
  }

  if(!values.phone) {
    errors.phone = 'Please Enter a Phone Number';
  }

  return errors;
}

function mapStateToProps( { orgs } ) {
  return { orgs: orgs }
}

export default reduxForm({
  validate,
  form: 'createContact'
})(
  connect(mapStateToProps, { createContact, getAllOrgs, attachContact })(CreateContact)
)
