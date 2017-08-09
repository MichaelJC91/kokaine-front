import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from '../actions/types';


function signinAuth(state = null, action) {
  switch(action.type) {

    case AUTH_USER:
      return { ...state, authenticated: true }

    case UNAUTH_USER:
      return { ...state, authenticated: false }

    case AUTH_ERROR:
      return { ...state, error: action.payload }
  }

  return state;
}

export default signinAuth;
