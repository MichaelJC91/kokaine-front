import _ from 'lodash';
import { GET_ALL_CONTACTS } from '../actions/types';

export default function( state={}, action ) {
  switch(action.type) {
    case GET_ALL_CONTACTS:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
