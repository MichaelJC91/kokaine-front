import React, { Component } from 'react';
import './css/App.css';
import LandingPage from './components/landing-page/landing_page';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

class App extends Component {

  componentWillMount() {
    injectTapEventPlugin();
  }

  render() {
    return (
      <MuiThemeProvider theme={ createMuiTheme() }>
        <LandingPage />
      </MuiThemeProvider>
    )
  }
}

export default App;
