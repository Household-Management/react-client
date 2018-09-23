import { Component } from 'react';
import * as React from "react";
import './App.css';
import { Route } from "react-router-dom";
import WelcomeView from "./views/WelcomeView";

class App extends Component {
  render() {
    return (
      <div>
          <Route path="/" component={WelcomeView}/>
      </div>
    );
  }
}

export default App;
