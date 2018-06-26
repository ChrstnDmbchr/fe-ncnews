import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from "./Nav"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Nav />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
