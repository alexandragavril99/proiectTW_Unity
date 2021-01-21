import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { sequelize, Users } from "./sequelize/sequelize.js";
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
    return await Users.findOne({
      where: { Email: email },
    });
  },
  async (id) => {
    return await Users.findOne({ where: { IdUser: id } });
  }
);

app.use(
  session({
    secret: "secret", //cheie pe care o vrem secreta care cripteaza toata informatia pt noi
    resave: false,
    saveUninitialized: false,
    name: "cookieLogin",
    cookie: {
      httpOnly: false,
      maxAge: 3600000, //durata sesiunii in milisecunde
    },
  })
);

app.use(passport.initialize()); //initializam passport in cadrul aplicatiei
app.use(passport.session()); //vrem ca datele sa fie persistente de-a lungul intregii sesiuni a userului

app.use("/api", router);

var port = 8080;
app.listen(port, () => {
  console.log("Server listening to port " + port);
});
