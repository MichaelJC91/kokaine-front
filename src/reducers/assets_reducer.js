import _ from 'lodash';
import { GET_ALL_ASSETS } from '../actions/types';

export default function(state = {}, action ) {
  switch(action.type) {
    case GET_ALL_ASSETS:
      return _.mapKeys(action.payload, 'id');
    default:
      return state;
  }
}
