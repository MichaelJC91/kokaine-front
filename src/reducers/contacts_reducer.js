import _ from 'lodash';
import { GET_ALL_CONTACTS, DELETE_CONTACT, UPDATE_CONTACT } from '../actions/types';

export default function(state = null, action ) {
  switch(action.type) {
    case GET_ALL_CONTACTS:
      return _.mapKeys(action.payload, 'id');
    case DELETE_CONTACT:
      return _.omit(state, action.payload);
    case UPDATE_CONTACT:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
