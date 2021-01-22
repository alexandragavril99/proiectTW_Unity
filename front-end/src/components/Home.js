import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

function createData(IdActivity, Name, StartDate, FinalDate) {
  return { IdActivity, Name, StartDate, FinalDate };
}

let data = [];
const rows = [];

export default function DenseTable() {
  axios
    .get("http://localhost:8080/api/getActivities", { withCredentials: true })
    .then((res) => {
      data = res.data;
      console.log(data);

      data.forEach((elem) => {
        rows.push(
          createData(elem.IdActivity, elem.Name, elem.StartDate, elem.FinalDate)
        );
      });

      console.log(rows);
    })
    .catch((err) => console.log(err));
  return (
    <TableContainer component={Paper} className="table">
      <Table>
        <TableHead className="table-head">
          <TableRow>
            <TableCell>Nume activitate</TableCell>
            <TableCell>Nume profesor</TableCell>
            <TableCell>Data de inceput</TableCell>
            <TableCell>Data de sfarsit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.Name}>
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell>{row.StartDate}</TableCell>
              <TableCell>{row.StartDate}</TableCell>
              <TableCell>{row.FinalDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
