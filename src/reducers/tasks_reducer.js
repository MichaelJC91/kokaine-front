import _ from 'lodash';
import { GET_ALL_TASKS, GET_SINGLE_TASK, UPDATE_TASK } from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case GET_ALL_TASKS:
      return _.mapKeys(action.payload, 'id');
    case GET_SINGLE_TASK:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_TASK:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
