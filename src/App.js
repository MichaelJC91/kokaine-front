import React, { Component } from 'react';
import './css/App.css';
import LandingPage from './components/landing-page/landing_page';
import injectTapEventPlugin from 'react-tap-event-plugin';

class App extends Component {

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    return (
      <LandingPage />
    )
  }
}

export default App;
