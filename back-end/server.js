import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { sequelize } from "./sequelize/sequelize.js";
import { router } from "./routes/routes.js";

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

var port = 8080;
app.listen(port, () => {
  console.log("Server listening to port " + port);
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize has succesfully connected of the database");
  })
  .catch((err) => console.error("Unable to connect to the database: ", err));
