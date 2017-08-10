import axios from 'axios';
import { GET_ALL_ORGANISATIONS, UPDATE_ORGANISATION, DELETE_ORGANISATION, CREATE_ORGANISATION, GET_SINGLE_ORGANISATION } from '../types';
import history from '../../config/history';
const ROOT_URL = 'http://kokaine.staging.bid';

export function getAllOrgs() {

  const TOKEN = localStorage.getItem('token');

  return function(dispatch) {

    axios.get(`${ROOT_URL}/api/organisations?token=${TOKEN}`)
    .then((response) => {

      const { organisations } = response.data;

      dispatch({ type: GET_ALL_ORGANISATIONS, payload: organisations  });

    })
    .catch(err => console.log(err))
  }
}

export const UpdateOrg = (org) => {
  const TOKEN = localStorage.getItem('token');

  let { name, email, phone } = org;

  let newOrgData = { name, email, phone };

  return function(dispatch) {

    axios.put(`${ROOT_URL}/api/organisations/${org.id}?token=${TOKEN}`, newOrgData)
      .then((response) => {

        const { organisation } = response.data;

        dispatch({ type: UPDATE_ORGANISATION, payload: organisation })

        // Redirect to organisations page
        history.push('/dashboard/organisations');

      });

  }
}

export const createOrganisation = (org) => {

  const TOKEN = localStorage.getItem('token');

  return function(dispatch) {
    axios.post(`${ROOT_URL}/api/organisations?token=${TOKEN}`, org)
      .then(response => {

        const { name, email, phone } = response.data.organisation;

        dispatch({
          type: CREATE_ORGANISATION,
          payload: { name, email, phone }
        });

        // - Redirect back to dashboard
        history.push('/dashboard/organisations');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const deleteOrganisation = (org) => {
  const TOKEN = localStorage.getItem('token');

  return function(dispatch) {
    axios.delete(`${ROOT_URL}/api/organisations/${org.id}?token=${TOKEN}`)
      .then(() => {
        dispatch({ type: DELETE_ORGANISATION, payload: org.id  });

        history.push('/dashboard/organisations');

      })
      .catch(err => console.log(err));
  }
}

export const getOrgFromID = (orgID) => {
  const TOKEN = localStorage.getItem('token');
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/organisations/${orgID}?token=${TOKEN}`)
      .then(response => {

        const { organisation } = response.data;

        dispatch({ type: GET_SINGLE_ORGANISATION, payload: organisation })
      })
      .catch(err => console.log(err))
  }
}

export const selectOrg = (organisation) => {
  return function(dispatch) {
    dispatch({ type: GET_SINGLE_ORGANISATION, payload: organisation })
  }
}
