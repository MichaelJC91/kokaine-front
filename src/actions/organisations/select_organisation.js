import { GET_SINGLE_ORGANISATION } from '../types';

export const selectOrg = (organisation) => {
  return {
    type: GET_SINGLE_ORGANISATION,
    payload: organisation
  }
}
