import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER } from './types';
import history from '../config/history';
const ROOT_URL = 'http://kokaine.staging.bid';

export function signinUser(values) {
  return function (dispatch) {

    // Submit email/password to server
    axios.post(`${ROOT_URL}/api/user/signin`, values)
      .then(response => {

        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save JWT Token
        localStorage.setItem('token', response.data.token);

        // - Redirect to special route
        history.push('/dashboard');

      })
      .catch(() => {
        dispatch(authError('Bad Login Info'))
      })
  }
}

export function signupUser(values) {
  return function (dispatch) {

    // Submit email/password to server
    axios.post(`${ROOT_URL}/api/user`, values)
      .then(response => {

        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save JWT Token
        localStorage.setItem('token', response.data.token);

        // - Redirect to special route
        history.push('/dashboard');

      })
      .catch(error => {
        dispatch(authError(error.response.data.email[0]))
      })
  }
}

export function signoutUser() {
  return function(dispatch) {
    localStorage.removeItem('token');
    dispatch({ type: UNAUTH_USER });
    history.push('/');
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
