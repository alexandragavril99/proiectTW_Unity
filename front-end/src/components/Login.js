import React, { Component } from "react";
import {Button} from "@material-ui/core";

class Login extends Component {
  render() {
    return (
      <form>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <h3 className="h-auth">Login</h3>
            <div className="form-group">
              <label>Username/Email</label>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter email..."
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter password..."
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default Login;
