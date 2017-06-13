import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Dashboard from './components/dashboard/dashboard';
import SignOut from './components/landing-page/signout';
import RequireAuth from './components/auth/require_auth';
import IsAuthenticated from './components/auth/is_authenticated';
import NoMatch from './components/noMatch/no_match';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import './index.css';
import { Router, Switch, Route } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
import history from './config/history'
import { AUTH_USER } from './actions/types';

// Global Store
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// JWT Token
const token = localStorage.getItem('token');

// Check to see if JWT exists
if(token) {
  // Update authentication state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={history}>
      <Switch>
        <Route path="/signout" component={ SignOut } />
        <Route path="/dashboard" component={RequireAuth(Dashboard)} />
        <Route path="/" component={IsAuthenticated(App)} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
