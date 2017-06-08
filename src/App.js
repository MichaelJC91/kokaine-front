import React, { Component } from 'react';
import './css/App.css';
import HelloWorld from './components/Hello-World';
import HelloWorldTwo from './components/Hello-World-Two';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Home />
            <hr/>
            <Switch>
              <Route path="/hello" component={ HelloWorld }/>
              <Route path="/hello-two" component={ HelloWorldTwo }/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
