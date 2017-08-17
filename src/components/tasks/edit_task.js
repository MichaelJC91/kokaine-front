import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getTaskFromID, updateTask } from '../../actions/tasks/index';
import { getAllAssets } from '../../actions/assets/index';
import _ from 'lodash';

class EditTask extends Component {

  componentWillMount() {
    this.props.getAllAssets();
    if(!this.props.initialValues) {
      const {id} = this.props.match.params;
      this.props.getTaskFromID(id);
    }
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

  onSubmit(values) {
    this.props.updateTask(values);
  }

  render() {

    const { handleSubmit } = this.props;

    if(!this.props.initialValues) {
      return <div>Loading...</div>
    }

    return(
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this) )} >
          <Field
            name="name"
            component={ this.renderField }
            type="text"
            label="Task Name"
          />
          <Field
            name="description"
            component={ this.renderField }
            type="text"
            label="Description"
          />
          <Field
            name="asset_id"
            component={ this.renderSelectField }
            label="Belongs To">
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
          <button className="btn btn-primary cursor-pointer" type="submit">Save</button>
        </form>
      </div>
    )
  }
}

EditTask = reduxForm({
  form: 'editTask'
})(EditTask);

function mapStateToProps({ tasks, assets }, ownProps) {

  if(tasks[ownProps.match.params.id]) {

    const { name, description, asset_id, status_id, user_id, id  } = tasks[ownProps.match.params.id];
    return {
      tasks,
      assets,
      initialValues: {
        name,
        description,
        asset_id,
        status_id,
        user_id,
        id
      }
    }
  }

  return { assets }

}

EditTask = connect(
  mapStateToProps, { getTaskFromID, updateTask, getAllAssets }
)(EditTask)

export default EditTask;
