import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import {
  sequelize,
  Activities,
  Professors,
  //Feedback,
  //Students,
} from "./sequelize/sequelize.js";

var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api", router);

router.use((req, res, next) => {
  console.log("Hello from middleware!");
  next();
});

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

router.route("/reset").get((req, res) => {
  sequelize
    .sync({ force: true, alter: true })
    .then(() => {
      console.log("Sync complete!");
      res.status(200).send({ message: "Sync complete!" });
    })
    .catch((err) => {
      console.log("Error at creating: " + err);
      res.status(500).send(err);
    });
});
