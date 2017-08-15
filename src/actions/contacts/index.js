import axios from 'axios';
import { GET_ALL_CONTACTS, GET_SINGLE_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, CREATE_CONTACT } from '../types';
import history from '../../config/history';
const ROOT_URL = 'https://kokaine.staging.bid';

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

export const getContactFromID = (contactID) => {
  const TOKEN = localStorage.getItem('token');

  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/contacts/${contactID}?token=${TOKEN}`)
      .then(response => {

        //Extract contact object from response
        const { contact } = response.data;

        // Dispatch single contact to reducer
        dispatch({ type: GET_SINGLE_CONTACT, payload: contact });

      })
      .catch(err => console.log(err));
  }
}

// action called when clicked on "edit contact" in contacts component
export const selectContact = (contact) => {
  return function(dispatch) {
    dispatch({ type: GET_SINGLE_CONTACT, payload: contact })
  }
}

export const deleteContact = (contactID) => {
  const TOKEN = localStorage.getItem('token');

  return function(dispatch) {
    axios.delete(`${ROOT_URL}/api/contacts/${contactID}?token=${TOKEN}`)
      .then(() => {
        dispatch({ type: DELETE_CONTACT, payload: contactID })

      })
      .catch(err => console.log(err))
  }
}


export const updateContact = (contact) => {
  const TOKEN = localStorage.getItem('token');

  const { name, email, phone } = contact;
  const updatedContactData = { name, email, phone };

  return function(dispatch) {
    axios.put(`${ROOT_URL}/api/contacts/${contact.id}?token=${TOKEN}`, updatedContactData)
      .then((response) => {

        const { contact } = response.data;
        dispatch({ type: UPDATE_CONTACT, payload: contact })

        history.push('/dashboard/contacts');

      })
      .catch(err => console.log(err))
  }
}

export const createContact = (contact) => {
  const TOKEN = localStorage.getItem('token');

  return function(dispatch) {

    axios.post(`${ROOT_URL}/api/contacts?token=${TOKEN}`, contact)
      .then((response) => {

        const { contact } = response.data;

        dispatch({ type: CREATE_CONTACT, payload: contact });

        history.push('/dashboard/contacts');

      })
      .catch(err => console.log(err));
  }
}
