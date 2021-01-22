import React, { Component } from "react";
import {Button} from "@material-ui/core";
import bg from "../assets/background.jpg"
import logo from "../assets/logo.png"

class Login extends Component {
  render() {
    return (
      <form>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div>
            <img src={logo} alt="logo" className="logo"/>
            </div>
            <div>
            <h3 className="h-welcome">Welcome back</h3>
            <h3 className="h-auth">Login to your account</h3>
            </div>
            <div>
              <label className="input-h">Email</label>
              <input
                type="email"
                name="email"
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
            <button type="submit" className="btn-login">
              Login
            </button>
            <h4 className="forgot"> Forgot your password?
              <span className="click"> Recover</span>
            </h4>
          </div>
          <div className="side-p">
            <img src={bg} alt="bg"/>
          </div>
        </div>
      </form>
    );
  }
}


export default Login;
