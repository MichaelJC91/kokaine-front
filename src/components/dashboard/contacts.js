import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllContacts, selectContact, deleteContact } from '../../actions/contacts/index';
import _ from 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router-dom';
injectTapEventPlugin();

class Contacts extends Component {

  componentDidMount() {
    this.props.getAllContacts();
  }

  renderContactListRow() {
    return _.map(this.props.contacts, contact => {
      return (
        <TableRow key={contact.id}>
          <TableRowColumn>{ contact.name }</TableRowColumn>
          <TableRowColumn>{ contact.phone }</TableRowColumn>
          <TableRowColumn>{ contact.email }</TableRowColumn>
          <TableRowColumn>
            { console.log(this.props.contacts) }
            <Link to={ `/dashboard/contacts/${contact.id}/edit` } onClick={() => this.props.selectContact(contact)}>
              Edit Contact
            </Link>
            <span> | </span>
            <span className="delete-button" onClick={() => this.props.deleteContact(contact.id)  }>Delete</span>
          </TableRowColumn>
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
        <MuiThemeProvider>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Phone</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              { this.renderContactListRow() }
            </TableBody>
          </Table>
        </MuiThemeProvider>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { contacts: state.contacts }
}

export default connect(mapStateToProps, { getAllContacts, selectContact, deleteContact })(Contacts);
