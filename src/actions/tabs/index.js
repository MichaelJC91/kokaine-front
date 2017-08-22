import { SELECT_TAB } from '../types';

export const selectTab = (value) => {
  return function(dispatch) {
    dispatch({ type: SELECT_TAB, payload: value });
  }
}
