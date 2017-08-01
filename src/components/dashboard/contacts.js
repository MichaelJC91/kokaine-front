import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllContacts } from '../../actions/contacts/index';
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
injectTapEventPlugin();

class Contacts extends Component {

  componentDidMount() {
    this.props.getAllContacts()
  }

  renderContactList() {
    return _.map(this.props.contacts, contact => {
      return (
        <li key={ contact.id } >{ contact.name }</li>
      )
    })
  }

  render() {
    return (
      <MuiThemeProvider>
      <Table selectable={ false }>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableRowColumn>1</TableRowColumn>
                <TableRowColumn>John Smith</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>2</TableRowColumn>
                <TableRowColumn>Randal White</TableRowColumn>
                <TableRowColumn>Unemployed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>3</TableRowColumn>
                <TableRowColumn>Stephanie Sanders</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>4</TableRowColumn>
                <TableRowColumn>Steve Brown</TableRowColumn>
                <TableRowColumn>Employed</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return { contacts: state.contacts }
}

export default connect(mapStateToProps, { getAllContacts })(Contacts);
