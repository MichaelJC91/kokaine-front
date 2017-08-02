import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { UpdateOrg } from '../../actions/organisations/index';

class EditOrganisation extends Component {

  renderField(field) {
    const { type, placeholder, orgValues } = field;
    return(
      <div className="form-group">
        <label>{field.label}</label>
        <input {...field.input} type={type} placeholder={placeholder || ''} className="form-control"/>
      </div>
    )
  }

  onSubmit(values) {
    let { name, email, phone, id } = values;
    this.props.UpdateOrg( { name, email, phone, id } );
  }

  render() {

    console.log(this)

    const { handleSubmit } = this.props;

    if(!this.props.initialValues) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this) ) }>
          <Field
            name="name"
            label="Organisation Name"
            type="text"
            component={ this.renderField }
          />
          <Field
            name="email"
            label="Organisation Email"
            type="email"
            component={ this.renderField }
          />
          <Field
            name="phone"
            label="Organisation Phone Number"
            type="tel"
            component={ this.renderField }
          />
          <button className="btn btn-primary" type="submit">Edit Organisation</button>
        </form>
      </div>
    )
  }
}

EditOrganisation = reduxForm({
  form: 'initializeFromState' // a unique identifier for this form
})(EditOrganisation)

// You have to connect() to any reducers that you wish to connect to yourself
EditOrganisation = connect(
  state => ({
    initialValues: state.selectedOrg || { name: 'Michael' }, // pull initial values from account reducer
    orgs: state.orgs
  }),{ UpdateOrg } // bind account loading action creator
)(EditOrganisation)

export default EditOrganisation;
