import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hello">Home</Link></li>
          <li><Link to="/hello-two">Home</Link></li>
        </ul>
      </div>
    )
  }
}

export default Home;
