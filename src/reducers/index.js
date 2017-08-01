import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import orgsReducer from './organisation_reducer';
import contactsReducer from './contacts_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  orgs: orgsReducer,
  contacts: contactsReducer
});

export default rootReducer;
