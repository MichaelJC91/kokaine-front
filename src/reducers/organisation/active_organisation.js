import { GET_SINGLE_ORGANISATION } from '../../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case GET_SINGLE_ORGANISATION:
      return action.payload;
      break;
  }
  return state;
}
