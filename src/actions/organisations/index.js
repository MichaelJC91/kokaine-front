import axios from 'axios';
import { GET_ALL_ORGANISATIONS } from '../types';
import history from '../../config/history';
const ROOT_URL = 'http://kokaine.staging.bid';
const TOKEN = localStorage.getItem('token');

export function getAllOrgs() {
  return function(dispatch) {

    axios.get(`${ROOT_URL}/api/organisations?token=${TOKEN}`)
    .then((response) => {

      const { organisations } = response.data;

      dispatch({ type: GET_ALL_ORGANISATIONS, payload: organisations  })

    })
    .catch(err => console.log(err))
  }
}
