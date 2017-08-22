import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { getAllTasks, selectTask } from '../../actions/tasks/index';
import { expandContent } from '../../actions/effects/index';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Create from 'material-ui-icons/Create';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';

const tableRowWidth = {
  maxWidth: 400
}

class Tasks extends Component {

  componentWillMount() {
    this.props.getAllTasks();
  }

  handleExpandClick() {
    this.props.expandContent();
  }

  renderListLayout() {
    return _.map(this.props.tasks, task => {
      return (
        <TableRow key={task.id}>
          <TableCell>{ task.name }</TableCell>
          <TableCell style={ { maxWidth: 250 } }>{ task.description }</TableCell>
          <TableCell>{ task.user.name }</TableCell>
          <TableCell>{ task.asset.name }</TableCell>
          <TableCell>{ task.status.name }</TableCell>
          <TableCell>
            <div>
              <IconButton aria-label="Edit" color="primary" className="no-outline">
                <Link to={ `/dashboard/tasks/${task.id}/edit` } onClick={() => this.props.selectTask(task)}>
                  <Create />
                </Link>
              </IconButton>
            </div>
          </TableCell>
        </TableRow>
      )
    })
  }

  render() {
    return (
      <div>
        <Link to="/dashboard/tasks/new">
          <Button raised color="primary" className="marginBottom">Create Task</Button>
        </Link>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Belongs To</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { this.renderListLayout() }
              </TableBody>
            </Table>
          </Paper>
        </div>
    )
  }
}

function mapStateToProps( state ) {
  return { tasks: state.tasks, effects: state.effects }
}

export default connect(mapStateToProps, { getAllTasks, expandContent ,selectTask })(Tasks);
