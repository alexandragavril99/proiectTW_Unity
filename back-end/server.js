import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
//import {sequelize} from "./config/dbconfig.js"
import {sequelize} from "./models/index.js"

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



// sequelize.authenticate()
// .then(()=>{console.log("Sequelize has succesfully conected of the database")})
// .catch(err => console.error("Unable to connect to the databse: ", err)); 



// sequelize
// .sync({force: true, alter: true})  
// .then(()=> {console.log("Sync complete!")}) 
// .catch(err =>console.log("Error at creating: "+ err));