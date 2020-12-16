import express from "express";
import bcrypt from "bcrypt";
import {
  Activities,
  Professors,
  Students,
  Feedback,
  sequelize,
} from "../sequelize/sequelize.js";
import passport from "passport";

export var router = express.Router();

// router.use((req, res, next) => {
//   console.log("Hello from middleware!");
//   next();
// });

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
  const activitate = {
    Nume: req.body.Nume,
    CodAcces: req.body.CodAcces,
    DataInceput: req.body.DataInceput,
    DataSfarsit: req.body.DataSfarsit,
    TipActivitate: req.body.TipActivitate,
  };
  let errors = [];

  if (
    !activitate.Nume ||
    !activitate.CodAcces ||
    !activitate.DataInceput ||
    !activitate.DataSfarsit ||
    !activitate.TipActivitate
  ) {
    console.log("Empty fields!");
    errors.push("Empty fields!");
  }
  if (activitate.Nume.length < 2) {
    console.log("Name should have more than 2 characters!");
    errors.push("Name should have more than 2 characters!");
  }

  if (activitate.CodAcces.length < 2) {
    console.log("Code Access should have more than 2 characters!");
    errors.push("Code Access should have more than 2 characters!");
  }

  if (Date.parse(activitate.DataInceput) > Date.parse(activitate.DataSfarsit)) {
    console.log("Wrong date!");
    errors.push("Wrong date!");
  }

  if (
    activitate.TipActivitate != "seminar" &&
    activitate.TipActivitate != "curs"
  ) {
    console.log("Wrong activity type!");
    errors.push("Wrong activity type!");
  }

  if (errors.length === 0) {
    try {
      Activities.create(activitate).then((result) => res.json(result));
      //  res.status(201).send({ message: "Activitate adaugata!" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "EROARE" });
    }
  } else {
    res.status(400).send(errors);
  }
});

router.route("/getActivities").get((req, res) => {
  Activities.findAll().then((result) => res.json(result));
});

router.route("/getActivitiesByType/type").get((req, res) => {
  Activities.findAll({
    where: {
      TipActivitate: req.query.TipActivitate,
    },
  }).then((result) => res.json(result));
});

router.route("/addFeedback").post((req, res) => {
  const feedback = {
    Text: req.body.Text,
    Nota: req.body.Nota,
    DataFeedback: req.body.DataFeedback,
    IdActivitate: req.body.IdActivitate,
  };

  let errors = [];

  if (!feedback.Text || !feedback.Nota || !feedback.IdActivitate) {
    console.log("Missing fields!");
    errors.push("Missing fields!");
  }

  if (feedback.Text.length < 10 || feedback.Text.length > 100) {
    console.log("The feedback must have between 10 and 100 characters!");
    errors.push("The feedback must have between 10 and 100 characters!");
  }

  if (errors.length === 0) {
    try {
      Feedback.create(feedback).then((result) => res.json(result));
      //  res.status(201).send({ message: "Feedback adaugat!" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "EROARE" });
    }
  } else {
    res.status(400).send(errors);
  }
});

router.route("/getFeedback").get((req, res) => {
  Feedback.findAll().then((result) => res.json(result));
});

router.route("/getFeedbackByActivityId/:id").get((req, res) => {
  Feedback.findAll({
    where: {
      IdActivitate: req.params.id,
    },
  })
    .then((result) => res.json(result))
    .catch((err) => console.log("Error!"));
});

router.route("/deleteActivity/:id").delete((req, res) => {
  Activities.findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() =>
      res.json(`The activity with the id ${req.params.id} was deleted!`)
    );
});

router.route("/updateActivity/:id").put((req, res) => {
  Activities.findByPk(req.params.id).then((record) => {
    record
      .update({
        Nume: req.body.Nume,
        CodAcces: req.body.CodAcces,
        DataInceput: req.body.DataInceput,
        DataSfarsit: req.body.DataSfarsit,
        TipActivitate: req.body.TipActivitate,
      })
      .then((result) => res.json(result));
  });
});

router.route("/checkAccessCode/:id").get((req, res) => {
  try {
    Activities.findByPk(req.params.id).then((result) => {
      if (result.CodAcces === req.body.CodAcces) {
        res.status(200).send({ message: "The code is ok!" });
      } else {
        res.status(400).send({ message: "Incorrect code!" });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.route("/addProfessor").post(async (req, res) => {
  const professor = {
    Nume: req.body.Nume,
    Email: req.body.Email,
    Parola: req.body.Parola,
  };

  let errors = [];

  if (!professor.Nume || !professor.Email || !professor.Parola) {
    console.log("Empty fields!");
    errors.push("Empty fields!");
  }
  if (professor.Nume.length < 2 || professor.Nume.length > 30) {
    console.log("Name should have more than 2 characters and less than 30!");
    errors.push("Name should have more than 2 characters and less than 30!");
  }
  if (
    !professor.Email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    console.log("Email incorrect!");
    errors.push("Email incorrect!");
  }
  if (professor.Email.length < 6) {
    console.log("Password should have more than 6 characters!");
    errors.push("Password should have more than 6 characters!");
  }

  if (errors.length === 0) {
    try {
      const hashedPassword = await bcrypt.hash(professor.Parola, 10);
      professor.Parola = hashedPassword;

      Professors.create(professor).then((result) =>
        res.status(201).send(result)
      );
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send(errors);
  }
});

router.route("/success").get(async (req, res) => {
  console.log("S-a apelat aici deci tre sa fie logat");
  res.status(200).send(req.session);
});

router.route("/fail").get(async (req, res) => {
  res
    .status(401)
    .send({ message: "Email & Password combination does not match." });
});

router.route("/notAllowed").get((req, res) => {
  res.status(401).send({ message: "You are not an admin." });
});

router.route("/notAuth").get(async (req, res) => {
  res
    .status(401)
    .send({ message: "You must authenticate to access this route." });
});

router.route("/alreadyAuth").get(async (req, res) => {
  res.status(401).send({ message: "You are already authenticated." });
});

router.get("/userData", checkNotAuth, async (req, res) => {
  res.status(200).send({ message: "Important stuff." });
});

router.get("/logout", async (req, res) => {
  res.status(200).send({ message: "You logged out!" });
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/api/alreadyAuth");
  }
  return next();
}

function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/notAuth");
}

router.route("/login").post(
  checkAuth,
  passport.authenticate("local", {
    successRedirect: "/api/success",
    failureRedirect: "/api/fail",
  })
);

router.delete("/logout", async (req, res) => {
  req.logOut();
  res.redirect("/api/logout");
});

