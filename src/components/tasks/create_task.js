import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { Field, reduxForm } from 'redux-form';
import { createTask } from '../../actions/tasks/index';
import { getAllAssets } from '../../actions/assets/index';
import _ from 'lodash';

class CreateContact extends Component {

  componentWillMount() {
    this.props.getAllAssets();
  }

  renderSelectField( { input, label, type, meta: { touched, error }, children } ) {
    return(
      <div className="form-group">
        <label>{label}</label>
        <div className="danger-text">
          <select {...input} className="form-control">
            {children}
          </select>
          {touched && error && <span>{error}</span>}
        </div>
    </div>
    )
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
    this.props.createTask(values);
  }

  render() {

    const { handleSubmit } = this.props;

    return(
      <div>
        <h2>Create New Task</h2>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <Field
            name="name"
            label="Name"
            type="text"
            component={ this.renderField }
            placeholder="Change Logo"
          />
          <Field
            name="description"
            label="Task Description"
            type="text"
            component={ this.renderField }
            placeholder="Replace Logo"
          />
          <Field
            name="asset_id"
            component={ this.renderSelectField }
            label="Belongs To">
            <option/>
            { _.map(this.props.assets, asset => {
              return (
                <option key={ asset.id } value={ asset.id } >{ asset.name }</option>
              )
            }) }
          </Field>
          <Field
            name="status_id"
            component={ this.renderSelectField }
            label="Status">
            <option value="1">Open</option>
            <option value="2">In Progress</option>
            <option value="3">Pending</option>
            <option value="4">Closed</option>
          </Field>
          <Field
            name="user_id"
            component={ this.renderSelectField }
            label="Assigned To">
            <option />
            <option value="1">Peter Reginald</option>
            <option value="2">Michael Carniato</option>
          </Field>
          <Button raised color="primary" type="submit">Create</Button>
        </form>
      </div>
    )
  }
}

function mapStateToProps( { assets } ) {
  return {
    assets,
    initialValues: { status_id: "1" }
  }
}

function validate(values) {
  const errors = {};

  //validate inputs from values
  if(!values.name) {
    errors.name = 'Please Enter a Name';
  }

  if(!values.description) {
    errors.description = 'Please Enter a Description for the Task';
  }

  if(!values.asset_id) {
    errors.asset_id = 'Please Choose an Asset';
  }

  if(!values.user_id) {
    errors.user_id = 'Please Assign a User';
  }

  return errors;
}

CreateContact = reduxForm({
  form: 'createContact',
  validate
})(CreateContact);

CreateContact = connect(
  mapStateToProps, { getAllAssets, createTask }
)(CreateContact);

export default CreateContact;
