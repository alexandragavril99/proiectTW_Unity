import "./App.css";
import React, { Component } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Table from "./components/Table"
import AddActivity from "./components/AddActivity";
import CheckAccessCode from "./components/CheckAccessCode";
import Feedback from "./components/Feedback";
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
            <Route path="/addActivity" component={AddActivity} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/checkAccessCode" component={CheckAccessCode} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;
