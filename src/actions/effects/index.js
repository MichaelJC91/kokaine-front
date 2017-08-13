import { EXPAND_CONTENT } from '../types';

export const expandContent = () => {
  return function(dispatch) {
    dispatch({ type: EXPAND_CONTENT })
  }
}
