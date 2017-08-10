import _ from 'lodash';
import { GET_ALL_CONTACTS, DELETE_CONTACT, UPDATE_CONTACT, GET_SINGLE_CONTACT } from '../actions/types';

export default function(state = {}, action ) {
  switch(action.type) {
    case GET_ALL_CONTACTS:
      return _.mapKeys(action.payload, 'id');
    case DELETE_CONTACT:
      return _.omit(state, action.payload);
    case UPDATE_CONTACT:
      return { ...state, [action.payload.id]: action.payload };
    case GET_SINGLE_CONTACT:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
