import { GET_ALL_ORGANISATIONS, DELETE_ORGANISATION, MATCH_PARAM_ID } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_ALL_ORGANISATIONS:
      return _.mapKeys(action.payload, 'id');

    case DELETE_ORGANISATION:
      return _.omit(state, action.payload);

    case MATCH_PARAM_ID:
      return action.payload;

    default:
      return state;
  }
}
