import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getTaskFromID, updateTask } from '../../actions/tasks/index';

class EditTask extends Component {

  componentWillMount() {
    const {id} = this.props.match.params;
    this.props.getTaskFromID(id);
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
          <button className="btn btn-primary cursor-pointer" type="submit">Save</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ tasks }, ownProps) {
  return {
    initialValues: tasks[ownProps.match.params.id]
  }
}

EditTask = reduxForm({
  form: 'editTask'
})(EditTask);

EditTask = connect(
  mapStateToProps, { getTaskFromID, updateTask }
)(EditTask)

export default EditTask;
