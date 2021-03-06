import axios from 'axios';
import { GET_ALL_ORGANISATIONS, UPDATE_ORGANISATION, DELETE_ORGANISATION, CREATE_ORGANISATION, GET_SINGLE_ORGANISATION, CREATE_CONTACT } from '../types';
import history from '../../config/history';
const ROOT_URL = 'https://kokaine.staging.bid';

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

        console.log(response)

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

export const attachContact = (contact) => {
  const TOKEN = localStorage.getItem('token');
  const { name, email, phone, organisationID } = contact;
  console.log(contact)

  return function(dispatch) {

    axios.patch(`${ROOT_URL}/api/organisations/${organisationID}/attachNewContact?token=${TOKEN}`, { name, email, phone })
      .then(response => {
        const { organisation } = response.data;

        dispatch({ type: UPDATE_ORGANISATION, payload: organisation });
        history.push('/dashboard/contacts');
        dispatch({ type: CREATE_CONTACT });

      })
      .catch(err => console.log(err))

  }

}
