import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import orgsReducer from './organisation_reducer';
import contactsReducer from './contacts_reducer';
import tasksReducer from './tasks_reducer';
import effectsReducer from './effects_reducer';
import assetsReducer from './assets_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  orgs: orgsReducer,
  contacts: contactsReducer,
  tasks: tasksReducer,
  effects: effectsReducer,
  assets: assetsReducer 
});

export default rootReducer;
