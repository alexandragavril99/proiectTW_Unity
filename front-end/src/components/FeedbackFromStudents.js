import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

class FeedbackFromStudents extends Component {
  state = {
    rows: [],
  };
  constructor(props) {
    super(props);
    console.log("Home Constructor");
  }

  async componentDidMount() {
    let res = await axios.get("http://localhost:8080/api/getFeedback", {
      withCredentials: true,
    });
    let data = res.data;
    this.setState((prevState) => ({
      ...prevState,
      rows: data,
    }));
    console.log(this.state);
  }

  render() {
    return (
      <TableContainer component={Paper} className="table">
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell>Nota</TableCell>
              <TableCell>Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <TableRow key={row.IdFeedback} onClick={this.handleClick}>
                <TableCell component="th" scope="row">
                  {row.Grade}
                </TableCell>
                <TableCell>{row.Text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default FeedbackFromStudents;
