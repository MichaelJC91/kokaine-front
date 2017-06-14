import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Sidebar from './sidebar';
import MainDashboard from './main_dashboard';
import Organisations from './organisations';
import Tasks from './tasks';
import Contacts from './contacts';
import Charts from './charts';
import Account from './account';
import DashboardHeader from './header';
import history from '../../config/history'

export default class Dashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <DashboardHeader />
        </div>
        <div className="row dashboard-main-row">
          <Sidebar />
          <div className="col-md-10 dashboard-main-section">
            <Router history={ history }>
              <Switch>
                <Route path="/dashboard/organisations" component={ Organisations } />
                <Route path="/dashboard/tasks" component={ Tasks } />
                <Route path="/dashboard/contacts" component={ Contacts } />
                <Route path="/dashboard/charts" component={ Charts } />
                <Route path="/dashboard/user" component={ Account } />
                <Route path="/dashboard" component={ MainDashboard } />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    )
  }
}
