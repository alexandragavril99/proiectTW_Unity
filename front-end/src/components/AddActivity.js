import React, { Component } from "react";
import {
  Button,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import axios from "axios";

class addActivity extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    activityName: "",
    accessCode: "",
    startDate: "",
    endDate: "",
    activityType: "seminar",
    error: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    const {
      activityName,
      accessCode,
      startDate,
      endDate,
      activityType,
    } = this.state;

    if (!activityName || !accessCode || !startDate || !endDate) {
      return this.setState({
        ...this.state,
        error: "You must complete all the fields to submit.",
      });
    } else {
      this.setState({ ...this.state, error: "" });

      const postURL = `http://localhost:8080/api/addActivity/`;
      axios
        .post(postURL, {
          Name: activityName,
          AccessCode: accessCode,
          StartDate: startDate,
          FinalDate: endDate,
          ActivityType: activityType,
        })
        .then((response) => {
          console.log("AICI");
          this.props.history.push({
            pathname: "/home",
            state: {
              activityAdded: true,
              user: this.props.user
            },
          });
        })
        .catch((error) => {
          console.log(
            activityName,
            accessCode,
            startDate,
            endDate,
            activityType
          );
          console.log("Error");
          console.log(error);
          switch (error.response.status) {
            case 400:
              return this.setState({ ...this.state, error: "Bad request." });
            default:
              return this.setState({ ...this.state, error: "" });
          }
        });
    }
  }

  render() {
    return (
      <form>
        <div className="page-inner">
          <h3 className="h-auth">Add new activity</h3>
          <div>
            <label className="input-h">Activity Name</label>
            <input
              type="text"
              name="activityName"
              className="form-control"
              placeholder="Enter new activity name"
              value={this.state.activityName}
              onChange={this.handleChange}
            />

            <label className="input-h">Access Code</label>
            <input
              type="text"
              name="accessCode"
              className="form-control"
              placeholder="Enter an acces code"
              value={this.state.accessCode}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label className="input-h">Start Date</label>
            <input
              className="form-control"
              type="date"
              name="startDate"
              value={this.state.startDate}
              onChange={this.handleChange}
            />

            <label className="input-h">End Date</label>
            <input
              className="form-control"
              type="date"
              name="endDate"
              value={this.state.endDate}
              onChange={this.handleChange}
            />
          </div>

          <FormControl component="fieldset" className="form-check">
            <label className="input-h">Activity Type</label>
            <RadioGroup
              aria-label="activityType"
              name="activityType"
              value={this.value}
              onChange={this.handleChange}
            >
              <FormControlLabel
                value="seminar"
                control={
                  <Radio
                    checked={this.state.activityType === "seminar"}
                    onChange={() =>
                      this.setState({ ...this.state, activityType: "seminar" })
                    }
                  />
                }
                label="Seminar"
              />
              <FormControlLabel
                value="curs"
                control={
                  <Radio
                    checked={this.state.activityType === "curs"}
                    onChange={() =>
                      this.setState({ ...this.state, activityType: "curs" })
                    }
                  />
                }
                label="Curs"
              />
            </RadioGroup>
          </FormControl>

          {this.state.error && (
            <p style={{ color: "red" }}>{this.state.error}</p>
          )}

          <button
            type="submit"
            className="btn-login"
            onClick={this.handleSubmit}
          >
            Add Activity
          </button>
        </div>
      </form>
    );
  }
}

export default addActivity;
