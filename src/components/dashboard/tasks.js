import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { getAllTasks } from '../../actions/tasks/index';
import { expandContent } from '../../actions/effects/index';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Tasks extends Component {

  componentWillMount() {
    this.props.getAllTasks();
  }

  renderListLayout() {
    return _.map(this.props.tasks, task => {
      return (
        <TableRow key={task.id}>
          <TableCell>{ task.name }</TableCell>
          <TableCell>{ task.description }</TableCell>
          <TableCell>{ task.asset.name }</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h3>Task List</h3>
          </div>
          <div className="col-md-12">
            <MuiThemeProvider>
              <Table selectable={false}>
                <TableHead>
                  <TableRow>
                    <TableCell>Task</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Belongs To</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody displayRowCheckbox={false} stripedRows={true}>
                  { this.renderListLayout() }
                </TableBody>
              </Table>
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps( state ) {
  return { tasks: state.tasks }
}

export default connect(mapStateToProps, { getAllTasks, expandContent })(Tasks);
