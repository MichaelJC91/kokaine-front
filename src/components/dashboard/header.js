import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DashboardHeader extends Component {
  render() {
    return(
      <div className="col-md-12 dashboard-header-wrapper">
        <nav className="navbar navbar-toggleable-md">
          <h2 className="navbar-brand mb-0">KOKAINE</h2>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/signout">Signout</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

export default DashboardHeader;
