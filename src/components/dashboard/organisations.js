import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllOrgs } from '../../actions/organisations/index';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import $ from 'jquery';
// import matchHeight from 'jquery-match-height';

class Organisations extends Component {

  componentDidMount() {
    this.props.getAllOrgs();
  }

  companyBadge(name) {
    return name.split(' ')
          .slice(0, 2)
          .join(' ')
          .match(/\b(\w)/g)
          .join('');
  }

  renderCardLayout() {
    return _.map(this.props.orgs, org => {
      return (
        <div className="col-md-3" key={ org.id }>
          <div className="dashboard-card-layout d-flex flex-column text-center">
            <div className="dashboard-card-name-wrapper">
              <h1>{ this.companyBadge(org.name) }</h1>
              <h5>{ org.name }</h5>
            </div>
            <div className="dashboard-card-location-wrapper">
              <h6><i className="fa fa-map-marker" aria-hidden="true"></i>Melbourne, Australia</h6>
            </div>
            <div className="text-left dashboard-card-contact-info">
              <p><i className="fa fa-mobile" aria-hidden="true"></i><a href={ `tel:${org.phone}` }>{ org.phone }</a></p>
              <p><i className="fa fa-envelope" aria-hidden="true"></i><a href={ `tel:${org.phone}` }>{ org.email }</a></p>
              <p><i className="fa fa-globe" aria-hidden="true"></i><a href={ org.assets[0].name }>{ org.assets[0].name }</a></p>
              <Link className="btn btn-secondary btn-sm" to="#">Add Task</Link>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Link className="btn btn-primary mb-3" to="/dashboard/organisation/new">Add Organisation</Link>
          </div>
        </div>
        <div className="row">
          { this.renderCardLayout() }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { orgs: state.orgs }
}

export default connect(mapStateToProps, { getAllOrgs })(Organisations);
