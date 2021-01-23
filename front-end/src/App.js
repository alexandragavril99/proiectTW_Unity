import "./App.css";
import React, { Component } from "react";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Table from "./components/Table";
import AddActivity from "./components/AddActivity";
import CheckAccessCode from "./components/CheckAccessCode";
import Feedback from "./components/Feedback";
import { styled } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import axios from "axios";
import FeedbackFromStudents from "./components/FeedbackFromStudents";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleUser = this.handleUser.bind(this);
  }

  state = {
    user: null,
  };

  // componentDidMount() {
  //   axios.get('http://localhost:8080/api/checkSession')
  //   .then((res) => {
  //     console.log(res);
  //     this.setState({...this.state, user: res.data.user })
  //   })
  //   .catch((err) => console.log(err))
  // }

  handleUser(user) {
    this.setState({ ...this.state, user });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {!this.state.user ? (
                <Redirect to="/login" />
              ) : (
                <Redirect
                  to={{ pathname: "/home", state: { user: this.state.user } }}
                />
              )}
            </Route>
            <Route path="/login">
              <Login setUser={this.handleUser} />
            </Route>
            <Route path="/home">
              <Home user={this.state.user} />
            </Route>
            <Route path="/table" component={Table} />
            <Route path="/addActivity" component={AddActivity} />
            <Route path="/feedback" component={Feedback} />
            <Route path="/checkAccessCode" component={CheckAccessCode} />
            <Route
              path="/feedbackFromStudents"
              component={FeedbackFromStudents}
            ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
