import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Sidbar extends Component {
  render() {
    return(
      <div className="col-md-2 dashboard-sidebar">
        <ul className="list-group">
          <NavLink activeClassName="selected" exact to="/dashboard"><li className="list-group-item"><i className="fa fa-home" aria-hidden="true"></i>Dashboard</li></NavLink>
          <NavLink activeClassName="selected" to="/dashboard/organisations"><li className="list-group-item"><i className="fa fa-building-o" aria-hidden="true"></i>Organisations</li></NavLink>
          <NavLink activeClassName="selected" to="/dashboard/assets"><li className="list-group-item"><i className="fa fa-th-list" aria-hidden="true"></i>Assets</li></NavLink>
          <NavLink activeClassName="selected" to="/dashboard/tasks"><li className="list-group-item"><i className="fa fa-thumb-tack" aria-hidden="true"></i>Tasks</li></NavLink>
          <NavLink activeClassName="selected" to="/dashboard/contacts"><li className="list-group-item"><i className="fa fa-users" aria-hidden="true"></i>Contacts</li></NavLink>
          <NavLink activeClassName="selected" to="/dashboard/charts"><li className="list-group-item"><i className="fa fa-pie-chart" aria-hidden="true"></i>Charts</li></NavLink>
          <NavLink activeClassName="selected" to="/dashboard/user"><li className="list-group-item"><i className="fa fa-user-circle-o" aria-hidden="true"></i>Account</li></NavLink>
        </ul>
      </div>
    )
  }
}

export default Sidbar;
