import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { selectTab } from '../../actions/tabs/index';
import { selectTask } from '../../actions/tasks/index';
import { getOrgFromID, selectOrg } from '../../actions/organisations/index';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Create from 'material-ui-icons/Create';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import _ from 'lodash';

const noMargin = { marginLeft: 0, marginRight: 0, marginBottom: 20, marginTop: 0 };
const iconDim = { width: 30, height: 35 };

class SingleOrganisation extends Component {

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getOrgFromID(id);
  }

  handleChange(event, value) {
    this.props.selectTab(value)
  }

  renderContactList() {
    return _.map(this.props.orgs, org => {
      return _.map(org.contacts, contact => {
        return (
          <TableRow>
            <TableCell>{ contact.id }</TableCell>
            <TableCell>{ contact.name }</TableCell>
            <TableCell>{ contact.email }</TableCell>
            <TableCell>{ contact.phone }</TableCell>
            <TableCell>
              <Link to={ `#` }>
                <IconButton color="primary" aria-label="Edit" className="no-outline" style={ iconDim }>
                  <Create />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        )
      })
    })
  }

  renderAssetList() {
    return _.map(this.props.orgs, org => {
      return _.map(org.assets, asset => {
        return (
          <TableRow>
            <TableCell>{ asset.id }</TableCell>
            <TableCell>{ asset.name }</TableCell>
            <TableCell>
              <Link to={ `#` }>
                <IconButton color="primary" aria-label="Edit" className="no-outline" style={ iconDim }>
                  <Create />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        )
      });
    });
  }

  renderTaskList() {
    return _.map(this.props.orgs, org => {
      return _.map(org.tasks, task => {
        return(
          <TableRow>
            <TableCell style={ { maxWidth: 200 } }>{ task.name }</TableCell>
            <TableCell style={ { maxWidth: 150 } }>{ task.description }</TableCell>
            <TableCell style={ { width: 80 } }>{ task.user.name }</TableCell>
            <TableCell style={ { width: 80 } }>{ task.asset.name }</TableCell>
            <TableCell style={ { width: 80 } }>{ task.status.name }</TableCell>
            <TableCell style={ { width: 80 } }>
              <Link to={ `/dashboard/tasks/${task.id}/edit` } onClick={() => this.props.selectTask(task)}>
                <IconButton aria-label="Edit" color="primary" className="no-outline">
                  <Create />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        )
      })
    })
  }

  renderOverview() {

    return _.map(this.props.orgs, org => {
      return (
        [
        <Grid container key={1} spacing={8} className="paddingAll noMargin">
          <Grid item xs={12}>
            <Typography component="h3" type="headline">
              {org.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link to={ `/dashboard/` } onClick={() => this.props.selectOrg(org)} to={ `/dashboard/organisation/${org.id}/edit` }>
              <IconButton color="primary" aria-label="Edit" className="no-outline" style={ iconDim }>
                <Create />
              </IconButton>
            </Link>
            <IconButton color="accent" aria-label="Delete" className="no-outline" style={ iconDim }>
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography type="body2">
              Email:
            </Typography>
            <Typography type="body1">
              { org.email }
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography type="body2">
              Phone:
            </Typography>
            <Typography type="body1">
              { org.phone }
            </Typography>
          </Grid>
        </Grid>,
        <Grid container key={2} spacing={8} className="paddingAll singleMeta noMargin">
          <Grid item xs={12} sm={4}>
            <Typography type="body2">
              Created:
            </Typography>
            <Typography type="body1">
              <Moment fromNow>{ org.created_at }</Moment>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography type="body2">
              Updated:
            </Typography>
            <Typography type="body1">
              <Moment fromNow>{ org.updated_at }</Moment>
            </Typography>
          </Grid>
        </Grid>
      ])
    })
  }

  render() {

    if(!this.props.orgs) {
      return <div>Loading...</div>
    }

    return (
      <Paper>
        <Grid container spacing={16}>
          <Grid item xs={12} style={ { paddingBottom: 0 } }>
              <Tabs
                value={ this.props.tabs.value }
                onChange={ this.handleChange.bind(this) }
                indicatorColor="primary"
                textColor="primary"
                index={ this.props.tabs.value || 0 }
              >
                <Tab label="Overview" className="no-outline"/>
                <Tab label="Assets" className="no-outline"/>
                <Tab label="Tasks" className="no-outline"/>
                <Tab label="Contact Details" className="no-outline"/>
              </Tabs>
                {this.props.tabs.value === 0 &&
                  this.renderOverview()
                }
                {this.props.tabs.value === 1 &&
                  <Grid item xs={12}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        { this.renderAssetList() }
                      </TableBody>
                    </Table>
                  </Grid>
                }
                {this.props.tabs.value === 2 &&
                  <Grid item xs={12}>
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
                        { this.renderTaskList() }
                      </TableBody>
                    </Table>
                  </Grid>
                }
                {this.props.tabs.value === 3 &&
                  <Grid item xs={12}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Id</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        { this.renderContactList() }
                      </TableBody>
                    </Table>
                  </Grid>
                }
          </Grid>
        </Grid>
      </Paper>
    )
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.tabs,
    orgs: state.orgs
  }
}

export default connect(mapStateToProps, { selectTab, getOrgFromID, selectOrg, selectTask })(SingleOrganisation)
