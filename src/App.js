import React, { Component } from 'react';
import './css/App.css';
import LandingPage from './components/landing-page/landing_page';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

if (typeof window !== 'undefined') {
  injectTapEventPlugin()
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={ createMuiTheme() }>
        <LandingPage />
      </MuiThemeProvider>
    )
  }
}

export default App;
