import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { getAllTasks } from '../../actions/tasks/index';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import CreateIcon from 'material-ui/svg-icons/content/create';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Tasks extends Component {

  componentWillMount() {
    this.props.getAllTasks();
  }

  renderListLayout() {
    return _.map(this.props.tasks, task => {
      return (
        <TableRow key={task.id}>
          <TableRowColumn>{ task.name }</TableRowColumn>
          <TableRowColumn>{ task.description }</TableRowColumn>
          <TableRowColumn>{ task.asset.name }</TableRowColumn>
          <TableRowColumn>Status</TableRowColumn>
          <TableRowColumn><Link to="/dashboard"><FlatButton icon={ <CreateIcon /> } label="Edit" labelPosition="after" ></FlatButton></Link></TableRowColumn>
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
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Task</TableHeaderColumn>
                    <TableHeaderColumn>Description</TableHeaderColumn>
                    <TableHeaderColumn>Belongs To</TableHeaderColumn>
                    <TableHeaderColumn>Status</TableHeaderColumn>
                    <TableHeaderColumn></TableHeaderColumn>
                  </TableRow>
                </TableHeader>
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

export default connect(mapStateToProps, { getAllTasks })(Tasks);
