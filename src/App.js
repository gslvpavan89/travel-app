import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import services from "./services";
require("dotenv").config();

class App extends Component {
  componentWillMount() {
    services.generateAuthToken();
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
