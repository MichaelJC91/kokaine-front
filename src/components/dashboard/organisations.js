import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllOrgs } from '../../actions/organisations/index';
import _ from 'lodash';

class Organisations extends Component {

  componentDidMount() {
    const allThings = this.props.getAllOrgs();
  }

  renderList() {
    return _.map(this.props.orgs, org => {
      return (
        <li className="list-group-item" key={org.id}>
          { org.name }
        </li>
      )
    })
  }

  render() {
    return (
      <ul>
        { this.renderList() }
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return { orgs: state.orgs }
}

export default connect(mapStateToProps, { getAllOrgs })(Organisations);
