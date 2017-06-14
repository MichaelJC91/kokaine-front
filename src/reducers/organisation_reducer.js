import { GET_ALL_ORGANISATIONS } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_ALL_ORGANISATIONS:
      return _.mapKeys(action.payload, 'id');

    default:
      return state;
  }
}
