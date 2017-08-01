import axios from 'axios';
import { GET_ALL_CONTACTS } from '../types';
const ROOT_URL = 'http://kokaine.staging.bid';

export function getAllContacts() {
  return function(dispatch) {

    const TOKEN = localStorage.getItem('token');

    axios.get(`${ROOT_URL}/api/contacts?token=${TOKEN}`)
    .then((response) => {

      const { contacts } = response.data;

      dispatch({ type: GET_ALL_CONTACTS, payload: contacts  })

    })
    .catch(err => console.log(err))
  }
}
