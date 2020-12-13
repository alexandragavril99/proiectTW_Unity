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

router.route("/addActivity").post((req, res) => {
  // Activities.create({
  //   Nume: req.body.Nume, CodAcces: req.body.CodAcces,
  //   DataInceput: req.body.DataInceput, 
  //   DataSfarsit: req.body.DataSfarsit,
  //   TipActivitate: req.body.TipActivitate,
  // }).then(result => res.json(result));

  const activitate = {
    Nume: req.body.Nume, 
    CodAcces: req.body.CodAcces,
    DataInceput: req.body.DataInceput, 
    DataSfarsit: req.body.DataSfarsit,
    TipActivitate: req.body.TipActivitate,
  }
  let errors = [];

  if (!activitate.Nume || !activitate.CodAcces || !activitate.DataInceput || !activitate.DataSfarsit || !activitate.TipActivitate) {
    console.log("Empty fields!");
    errors.push("Empty fields!");
  }
  if (activitate.Nume.length <2) {
    console.log("Name should have more than 2 characters!");
    errors.push("Name should have more than 2 characters!");
  }

  if (activitate.CodAcces.length<2){
    console.log("Code Access should have more than 2 characters!");
    errors.push("Code Access should have more than 2 characters!");
  }

  if(Date.parse(activitate.DataInceput)>Date.parse(activitate.DataSfarsit)) {
    console.log("Wrong date!");
    errors.push("Wrong date!");
  }

  if(activitate.TipActivitate!="seminar" && activitate.TipActivitate!="curs"){
  console.log("Wrong activity type!");
  errors.push("Wrong activity type!");
}

 

 if (errors.length===0) {
 try {
   Activities.create(activitate).then((result) => res.json(result));
//  res.status(201).send({ message: "Activitate adaugata!" });
 } catch (error) {
   console.log(error);
   res.status(500).send({ message: "EROARE" });
 }

 }
 else {
   res.status(400).send(errors);
 }
});

router.route("/getActivities").get((req, res) => {
  Activities.findAll().then(result => res.json(result));
});

router.route("/getActivitiesByType/type").get((req, res) => {
  Activities.findAll({
    where: {
      TipActivitate: req.query.TipActivitate
  }
  }).then(result => res.json(result));
});
