import React, { Component } from 'react';
import Tabs, { Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { selectTab } from '../../actions/tabs/index';
import { getOrgFromID } from '../../actions/organisations/index';
import Grid from 'material-ui/Grid';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';
import Create from 'material-ui-icons/Create';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import _ from 'lodash';

const noMargin = { margin: 0 };
const iconDim = { width: 30, height: 35 };

class SingleOrganisation extends Component {

  componentWillMount() {
    const { id } = this.props.match.params;
    this.props.getOrgFromID(id);
  }

  handleChange(event, value) {
    this.props.selectTab(value)
  }

  renderOverview() {

    return _.map(this.props.orgs, org => {
      return (
        [
        <Grid container key={1} spacing={8} style={noMargin}>
          <Grid item xs={12}>
            <Typography component="h3" type="headline">
              {org.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Link to={ `/dashboard/` } onClick={() => console.log('hello')}>
              <IconButton color="primary" aria-label="Edit" className="no-outline" style={ iconDim }>
                <Create />
              </IconButton>
            </Link>
            <Link to={ `/dashboard/` } onClick={() => console.log('hello')}>
              <IconButton color="accent" aria-label="Delete" className="no-outline" style={ iconDim }>
                <DeleteIcon />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Typography type="body2">
              Email:
            </Typography>
            <Typography type="body1">
              { org.email }
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography type="body2">
              Phone:
            </Typography>
            <Typography type="body1">
              { org.phone }
            </Typography>
          </Grid>
        </Grid>,
        <Grid container key={2} spacing={8} style={noMargin}>
          <Grid item xs={3}>
            <Typography type="body2">
              Created:
            </Typography>
            <Typography type="body1">
              { console.log(org) }
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography type="body2">
              Updated At:
            </Typography>
            <Typography type="body1">
              Sometime
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
          <Grid item xs={12}>
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
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Action</TableCell>
                      </TableBody>
                    </Table>
                  </Grid>
                }
                {this.props.tabs.value === 2 &&
                  <div>
                    {'Item Three'}
                  </div>}
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

export default connect(mapStateToProps, { selectTab, getOrgFromID })(SingleOrganisation)
