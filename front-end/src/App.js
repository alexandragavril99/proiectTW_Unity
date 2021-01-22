import "./App.css";
import React, { Component } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Table from "./components/Table"
import addActivity from "./components/AddActivity";
import checkAccessCode from "./components/CheckAccessCode";
import feedback from "./components/Feedback";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/home" component={Home} />
            <Route path="/addActivity" component={addActivity} />
            <Route path="/feedback" component={feedback} />
            <Route path="/checkAccessCode" component={checkAccessCode} />
            <Route path="/table" component={Table}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
