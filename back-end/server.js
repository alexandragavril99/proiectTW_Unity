import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Professors, sequelize } from "./sequelize/sequelize.js";
import { router } from "./routes/routes.js";
import { initPassport } from "./passport/passport-config.js";
import passport from "passport";
import session from "express-session";

var app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(cors());

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize has succesfully connected of the database");
  })
  .catch((err) => console.error("Unable to connect to the database: ", err));

initPassport(
  passport,
  async (email) => {
    return await Professors.findOne({
      where: { Email: email },
    });
  },
  async (id) => {
    return await Professors.findOne({ where: { IdProfesor: id } });
  }
);

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "cookieLogin",
    cookie: {
      httpOnly: false,
      maxAge: 3600000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

var port = 8080;
app.listen(port, () => {
  console.log("Server listening to port " + port);
});
