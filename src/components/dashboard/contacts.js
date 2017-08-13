import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllContacts, selectContact, deleteContact } from '../../actions/contacts/index';
import _ from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';

class Contacts extends Component {

  componentWillMount() {
    this.props.getAllContacts();
  }

  renderContactListRow() {
    return _.map(this.props.contacts, contact => {
      return (
        <TableRow key={contact.id}>
          <TableCell>{ contact.name }</TableCell>
          <TableCell>{ contact.phone }</TableCell>
          <TableCell>{ contact.email }</TableCell>
          <TableCell>
            <Link to={ `/dashboard/contacts/${contact.id}/edit` } onClick={() => this.props.selectContact(contact)}>
              Edit Contact
            </Link>
            <span> | </span>
            <span className="delete-button" onClick={() => this.props.deleteContact(contact.id)  }>Delete</span>
          </TableCell>
        </TableRow>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <Link className="btn btn-primary" to="/dashboard/contacts/new">Create Contact</Link>
            </div>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.renderContactListRow() }
          </TableBody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { contacts: state.contacts }
}

export default connect(mapStateToProps, { getAllContacts, selectContact, deleteContact })(Contacts);
