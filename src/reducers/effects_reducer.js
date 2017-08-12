import { EXPAND_CONTENT } from '../actions/types';

export default function( state = { expanded: false }, action ) {
  switch(action.type) {
    case EXPAND_CONTENT:
      return { expanded: !state.expanded };
    default:
      return state;
  }
}
