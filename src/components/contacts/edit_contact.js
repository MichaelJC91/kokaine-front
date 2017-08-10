import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getContactFromID, updateContact } from '../../actions/contacts/index';
import _ from 'lodash';

class EditContact extends Component {

  componentWillMount() {
    const {id} = this.props.match.params;
    this.props.getContactFromID(id);
  }

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
    this.props.updateContact(values);
  }

  render() {

    const { handleSubmit } = this.props;

    if(!this.props.initialValues) {
      return <div>Loading...</div>
    }

    return(
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this) ) }>
          <Field
            name="name"
            label="Contact Name"
            type="text"
            component={ this.renderField }
          />
          <Field
            name="email"
            label="Contact Email"
            type="email"
            component={ this.renderField }
          />
          <Field
            name="phone"
            label="Contact Phone Number"
            type="tel"
            component={ this.renderField }
          />
          <button className="btn btn-primary cursor-pointer" type="submit">Edit Contact</button>
        </form>
      </div>
    )
  }
}

EditContact = reduxForm({
  form: 'editContact' // a unique identifier for this form
})(EditContact)

function mapStateToProps( { contacts }, ownProps ) {

  return {
    initialValues: contacts[ownProps.match.params.id]
  }

}

// You have to connect() to any reducers that you wish to connect to yourself
EditContact = connect(
  mapStateToProps, { updateContact, getContactFromID }
)(EditContact)

export default EditContact;
