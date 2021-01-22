import "./App.css";
import React, { Component } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Table from "./components/Table"
import { styled } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/table" component={Table}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
