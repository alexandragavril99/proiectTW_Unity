import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

class Home extends Component {
  state = {
    rows: [],
  };
  constructor(props) {
    super(props);
    this.handleDeleteActivity = this.handleDeleteActivity.bind(this);
  }

  async componentDidMount() {
    let res = await axios.get("http://localhost:8080/api/getActivities", {
      withCredentials: true,
    });
    let data = res.data;
    let parsedRows = [];
    if (data.length > 0) {
      data.map((entry) => {
        if (entry.Activities.length > 0) {
          entry.Activities.forEach((act) => {
            let obj = {
              Id: act.IdActivity,
              Name: act.Name,
              profName: entry.Name,
              startDate: act.StartDate.substr(0, 10),
              endDate: act.FinalDate.substr(0, 10),
            };
            parsedRows.push(obj);
          });
        }
      });
      console.log("parsed", parsedRows);
      this.setState((prevState) => ({
        ...prevState,
        rows: parsedRows,
      }));
      console.log(this.state);
    }
  }

  async handleDeleteActivity(id) {
    await axios.delete(`http://localhost:8080/api/deleteActivity/${id}`, {
      withCredentials: true,
    });
  }

  render() {
    return (
      <>
        {this.props.user.isProfessor && <div>Hello Professor</div>}
        <TableContainer component={Paper} className="table">
          <Table>
            <TableHead className="table-head">
              <TableRow>
                <TableCell>Nume activitate</TableCell>
                <TableCell>Nume profesor</TableCell>
                <TableCell>Data de inceput</TableCell>
                <TableCell>Data de sfarsit</TableCell>
                <TableCell></TableCell>
                {this.props.user.isProfessor && <TableCell></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row) => (
                <TableRow key={row.Id} onClick={this.handleClick}>
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell>{row.profName}</TableCell>
                  <TableCell>{row.startDate}</TableCell>
                  <TableCell>{row.endDate}</TableCell>
                  <TableCell>
                    <Link
                      to={{
                        pathname: "/checkaccesscode",
                        state: {
                          activityID: row.Id,
                        },
                      }}
                    >
                      <button>Acceseaza Activitatea</button>
                    </Link>
                  </TableCell>
                  {this.props.user.isProfessor && (
                    <TableCell>
                      <button onClick={() => this.handleDeleteActivity(row.Id)}>
                        Sterge Activitatea
                      </button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.props.user.isProfessor && (
          <Link
            to={{
              pathname: "/addActivity",
              state: {
                user: this.props.user
              }
            }}
          >
            <button className="btn-login">Adauga Activitate</button>
          </Link>
        )}
      </>
    );
  }
}

export default Home;
