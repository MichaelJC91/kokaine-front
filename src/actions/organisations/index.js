import axios from 'axios';
import { GET_ALL_ORGANISATIONS, UPDATE_ORGANISATION, DELETE_ORGANISATION, CREATE_ORGANISATION } from '../types';
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
  return function(dispatch) {

    axios.put(`${ROOT_URL}/api/organisations/${org.id}?token=${TOKEN}`)
      .then((response) => {
        console.log(response)
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
