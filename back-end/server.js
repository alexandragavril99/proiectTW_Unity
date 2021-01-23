import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { sequelize, Users } from "./sequelize/sequelize.js";
import { router } from "./routes/routes.js";
import { initPassport } from "./passport/passport-config.js";
import passport from "passport";
import session from "express-session";
import cookieParser from 'cookie-parser';

var app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize()); //initializam passport in cadrul aplicatiei
app.use(passport.session()); //vrem ca datele sa fie persistente de-a lungul intregii sesiuni a userului
app.use(cookieParser())
//app.use(cors());

const corsOptions = {
  origin: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Methods",
    "Access-Control-Request-Headers",
  ],
  credentials: true,
  enablePreflight: true,
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,DELETE,PUT,POST");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

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

app.use("/api", router);

var port = 8080;
app.listen(port, () => {
  console.log("Server listening to port " + port);
});
