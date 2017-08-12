import { EXPAND_CONTENT } from '../types';

export const expandContent = (bool) => {
  return function(dispatch) {
    dispatch({ type: EXPAND_CONTENT, payload: !bool })
  }
}
