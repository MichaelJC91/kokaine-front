import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllAssets } from '../../actions/assets/index';
import _ from 'lodash';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import { Link } from 'react-router-dom';
import DescriptionIcon from 'material-ui-icons/Description';
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';

class Assets extends Component {

  componentWillMount() {
    this.props.getAllAssets()
  }

  renderAssetList() {
    return _.map(this.props.assets, asset => {
      return (
        <TableRow key={asset.id}>
          <TableCell>{ asset.name }</TableCell>
          <TableCell>{ asset.organisation.name }</TableCell>
          <TableCell>
            { asset.pages.length ?
              <div style={ { paddingTop: 15 } }>
                <Badge badgeContent={ asset.pages.length } color="primary">
                  <DescriptionIcon />
                </Badge>
              </div>  :
              <Link to="/dashboard/pages/new"><Button color="primary" raised>Create Page</Button></Link>
            }
          </TableCell>
        </TableRow>
      )
    })
  }

  render() {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Organisation</TableCell>
              <TableCell>Pages</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.renderAssetList() }
          </TableBody>
        </Table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { assets: state.assets }
}

export default connect(mapStateToProps, { getAllAssets })(Assets);
