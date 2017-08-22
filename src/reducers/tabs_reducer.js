import { SELECT_TAB } from '../actions/types'

export default function(state = { value: 0 }, action) {
  switch(action.type) {
    case SELECT_TAB:
      return { value: action.payload }
    default:
      return state;
  }
}
