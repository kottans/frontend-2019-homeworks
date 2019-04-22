import React, { Component } from "react";

import { Route, BrowserRouter as Router } from "react-router-dom";

import { Header } from "../Header";

import { Home } from "../Home";

import { Characters } from "../Characters/";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route path="/characters" component={Characters} />
      </Router>
    );
  }
}

export default App;
