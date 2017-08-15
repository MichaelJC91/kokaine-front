import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllAssets } from '../../actions/assets/index';
import _ from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';

class Assets extends Component {

  componentWillMount() {
    this.props.getAllAssets()
  }

  render() {
    return (
      <div>
        <ul>
        {console.log(this.props.assets)}
          { _.map(this.props.assets, asset => {
            <li key={ asset.id }>{ asset.name }</li>
          }) }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { assets: state.assets }
}

export default connect(mapStateToProps, { getAllAssets })(Assets);
