import { GET_SINGLE_CONTACT } from '../../actions/types';

export default function( state = null, action ) {
  switch(action.type) {
    case GET_SINGLE_CONTACT:
      return action.payload;
      break;
  }
  return state;
}
