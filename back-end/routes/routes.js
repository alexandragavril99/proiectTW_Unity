import express from "express";
import bcrypt from "bcrypt";
import {
  Activities,
  Users,
  Feedback,
  sequelize,
} from "../sequelize/sequelize.js";
import passport from "passport";

export var router = express.Router();

router.use((req, res, next) => {
  console.log("Hello from middleware!");
  next();
});

// RESET ROUTE
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

//ADD ACTIVITY ROUTE
router.post("/addActivity", checkAdmin, async (req, res) => {
  const user = await req.user;
  const activity = {
    Name: req.body.Name,
    AccessCode: req.body.AccessCode,
    StartDate: req.body.StartDate,
    FinalDate: req.body.FinalDate,
    ActivityType: req.body.ActivityType,
    IdUser: user.IdUser,
  };
  let errors = [];

  if (
    !activity.Name ||
    !activity.AccessCode ||
    !activity.StartDate ||
    !activity.FinalDate ||
    !activity.ActivityType
  ) {
    console.log("Empty fields!");
    errors.push("Empty fields!");
  }
  if (activity.Name.length < 2) {
    console.log("Name should have more than 2 characters!");
    errors.push("Name should have more than 2 characters!");
  }

  if (activity.AccessCode.length < 2) {
    console.log("Code Access should have more than 2 characters!");
    errors.push("Code Access should have more than 2 characters!");
  }

  if (Date.parse(activity.StartDate) > Date.parse(activity.FinalDate)) {
    console.log("Wrong date!");
    errors.push("Wrong date!");
  }

  if (activity.ActivityType != "seminar" && activity.ActivityType != "curs") {
    console.log("Wrong activity type!");
    errors.push("Wrong activity type!");
  }

  if (errors.length === 0) {
    try {
      Activities.create(activity).then((result) => res.json(result));
      //  res.status(201).send({ message: "Activitate adaugata!" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "EROARE" });
    }
  } else {
    res.status(400).send(errors);
  }
});

// GET ALL ACTIVITIES ROUTE
router.get("/getActivities", checkNotAuth, (req, res) => {
  Activities.findAll()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err));
});

//GET ACTIVITIES BY TYPE (seminar/curs)
//localhost:8080/api/getActivitiesByType/type?ActivityType=seminar
router.get("/getActivitiesByType/type", checkNotAuth, (req, res) => {
  Activities.findAll({
    where: {
      ActivityType: req.query.ActivityType,
    },
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err));
});

//ADD FEEDBACK ROUTE
router.post("/addFeedback", checkStudent, async (req, res) => {
  const user = await req.user;
  const feedback = {
    Text: req.body.Text,
    Grade: req.body.Grade,
    FeedbackDate: req.body.FeedbackDate,
    IdActivity: req.body.IdActivity,
    IdUser: user.IdUser,
  };

  let errors = [];

  if (
    !feedback.Text ||
    !feedback.Grade ||
    !feedback.FeedbackDate ||
    !feedback.IdActivity
  ) {
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
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "EROARE" });
    }
  } else {
    res.status(400).send(errors);
  }
});

//GET ALL FEEDBACK
router.get("/getFeedback", checkAdmin, (req, res) => {
  Feedback.findAll()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err));
});

//GET FEEDBACK BY ActivityId
router.get("/getFeedbackByActivityId/:id", checkAdmin, (req, res) => {
  Feedback.findAll({
    where: {
      IdActivity: req.params.id,
    },
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err));
});

//GET FEEDBACK BY IdUser (student)
router.get("/getFeedbackByStudentUserId", checkStudent, async(req, res) => {
  const user = await req.user;
  Feedback.findAll({
    where: {
      IdUser: user.IdUser,
    },
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err));
});

//DELETE ACTIVITY BY ID
router.delete("/deleteActivity/:id", checkAdmin, (req, res) => {
  Activities.findByPk(req.params.id)
    .then((record) => {
      record.destroy();
    })
    .then(() =>
      res.json(`The activity with the id ${req.params.id} was deleted!`)
    );
});

//UPDATE ACTIVITY BY ID
router.put("/updateActivity/:id", checkAdmin, (req, res) => {
  const activity = {
    Name: req.body.Name,
    AccessCode: req.body.AccessCode,
    StartDate: req.body.StartDate,
    FinalDate: req.body.FinalDate,
    ActivityType: req.body.ActivityType,
  };
  let errors = [];

  if (
    !activity.Name ||
    !activity.AccessCode ||
    !activity.StartDate ||
    !activity.FinalDate ||
    !activity.ActivityType
  ) {
    console.log("Empty fields!");
    errors.push("Empty fields!");
  }
  if (activity.Name.length < 2) {
    console.log("Name should have more than 2 characters!");
    errors.push("Name should have more than 2 characters!");
  }

  if (activity.AccessCode.length < 2) {
    console.log("Code Access should have more than 2 characters!");
    errors.push("Code Access should have more than 2 characters!");
  }

  if (Date.parse(activity.StartDate) > Date.parse(activity.FinalDate)) {
    console.log("Wrong date!");
    errors.push("Wrong date!");
  }

  if (activity.ActivityType != "seminar" && activity.ActivityType != "curs") {
    console.log("Wrong activity type!");
    errors.push("Wrong activity type!");
  }

  if (errors.length === 0) {
    Activities.findByPk(req.params.id).then((record) => {
      record
        .update({
          Name: activity.Name,
          AccessCode: activity.AccessCode,
          StartDate: activity.StartDate,
          FinalDate: activity.FinalDate,
          ActivityType: activity.ActivityType,
        })
        .then((result) => res.json(result))
        .catch((err) => res.status(500).send(err));
    });
  } else {
    res.status(400).send(errors);
  }
});

//CHECK ACCESS CODE
router.get("/checkAccessCode/:id", checkStudent, (req, res) => {
  try {
    Activities.findByPk(req.params.id).then((result) => {
      if (result.AccessCode === req.body.AccessCode) {
        res.status(200).send({ message: "The code is ok!" });
      } else {
        res.status(400).send({ message: "Incorrect code!" });
      }
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

//ADD USER
router.route("/addUser").post(async (req, res) => {
  const user = {
    Name: req.body.Name,
    Email: req.body.Email,
    Password: req.body.Password,
    isProfessor: req.body.isProfessor,
  };

  let errors = [];

  if (!user.Name || !user.Email || !user.Password) {
    console.log("Empty fields!");
    errors.push("Empty fields!");
  }
  if (user.isProfessor !== 0 && user.isProfessor !== 1) {
    console.log("This field accepts only 0 and 1 values!");
    errors.push("This field accepts only 0 and 1 values!");
  }
  if (user.Name.length < 2 || user.Name.length > 30) {
    console.log("Name should have more than 2 characters and less than 30!");
    errors.push("Name should have more than 2 characters and less than 30!");
  }
  if (
    !user.Email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    console.log("Email incorrect!");
    errors.push("Email incorrect!");
  }
  if (user.Password.length < 6) {
    console.log("Password should have more than 6 characters!");
    errors.push("Password should have more than 6 characters!");
  }

  if (errors.length === 0) {
    try {
      const hashedPassword = await bcrypt.hash(user.Password, 10);
      user.Password = hashedPassword;

      Users.create(user).then((result) => res.status(201).send(result));
    } catch (err) {
      res.status(500).send(err);
    }
  } else {
    res.status(400).send(errors);
  }
});

//login check
router.route("/success").get(async (req, res) => {
  console.log("You logged in!");
  res.status(200).send(req.session);
});

//email & password doesn't match
router.route("/fail").get(async (req, res) => {
  res
    .status(401)
    .send({ message: "Email & Password combination does not match." });
});

//if you are not auth
router.route("/notAuth").get(async (req, res) => {
  res
    .status(401)
    .send({ message: "You must authenticate to access this route." });
});

//not allowed as student
router.get("/notAllowed", (req, res) => {
  res.status(401).send({ message: "Access denied. You are not a professor." });
});

//not allowed as professor
router.get("/notAllowedStudent", (req, res) => {
  res.status(401).send({ message: "Access denied. You are not a student." });
});

//if you are already auth
router.route("/alreadyAuth").get(async (req, res) => {
  res.status(401).send({ message: "You are already authenticated." });
});

//just an example for checkNotAuth
router.get("/userData", checkNotAuth, async (req, res) => {
  res.status(200).send({ message: "Important stuff." });
});

//logout
router.get("/logout", async (req, res) => {
  res.status(200).send({ message: "You logged out!" });
});

//check if user is auth
function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/api/alreadyAuth");
  }
  return next();
}

//check if user is not auth
function checkNotAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/api/notAuth");
}

//check if user is professor
async function checkAdmin(req, res, next) {
  const user = await req.user;
  if (req.isAuthenticated() && user.isProfessor) {
    return next();
  } else res.redirect("/api/notAllowed");
}

//check if user is student
async function checkStudent(req, res, next) {
  const user = await req.user;
  if (req.isAuthenticated() && !user.isProfessor) {
    return next();
  } else res.redirect("/api/notAllowedStudent");
}

//login
router.route("/login").post(
  checkAuth,
  passport.authenticate("local", {
    successRedirect: "/api/success",
    failureRedirect: "/api/fail",
  })
);

//logout
router.delete("/logout", async (req, res) => {
  req.logOut();
  res.redirect("/api/logout");
});
