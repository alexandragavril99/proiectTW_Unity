import React, { Component, useState } from "react";
import { Button } from "@material-ui/core";
import bg from "../assets/background.jpg";
import logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory, withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state.Email);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;
    let logged = false;
    if (!this.state.Email || !this.state.password) {
      toast.error("Combination is not valid!");
      valid = false;
    }
    console.log(this.state);
    if (valid) {
      axios
        .post("http://localhost:8080/api/login", this.state)
        .then((res) => {
          console.log(res);
          console.log(this.state);
          logged = true;
          // const history = useHistory();
          // history.push("/home");
          // window.location.href = "http://localhost:3000/home";
        })
        .catch((err) => {
          console.log(err);
          toast.error("Combination is not valid!");
        });
    }
  };

  render() {
    return (
      <form>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div>
              <h3 className="h-welcome">Welcome back</h3>
              <h3 className="h-auth">Login to your account</h3>
            </div>
            <div>
              <label className="input-h">Email</label>
              <input
                type="email"
                name="Email"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter email"
              />
              <label className="input-h">Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="btn-login"
              onClick={this.handleSubmit}
            >
              Login
            </button>
            <h4 className="forgot">
              {" "}
              Forgot your password?
              <span className="click"> Recover</span>
            </h4>
          </div>
          <div className="side-p">
            <img src={bg} alt="bg" />
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
