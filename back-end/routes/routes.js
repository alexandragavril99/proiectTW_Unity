import express from "express";
import {
  Activities,
  Professors,
  Students,
  Feedback,
  sequelize,
} from "../sequelize/sequelize.js";

export var router = express.Router();

router.use((req, res, next) => {
  console.log("Hello from middleware!");
  next();
});

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
