import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

class CreateContact extends Component {

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
    console.log(values);
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
            placeholder="Wayne Industries"
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
          <button type="submit" className="btn btn-primary cursor-pointer">Create New Contact</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'createContact'
})(
  connect(null, {  })(CreateContact)
)
