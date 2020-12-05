// import Activitati from './activitate.js'
// import Feedback from './feedback.js'
// import Profesori from './profesor.js'
// import Studenti from './student.js'
import sequelize from '../config/dbconfig.js'


export const Activitati = sequelize.define("Activitati",
    {

        IdActivitate: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
        Nume: {
            type: Sequelize.STRING
        },
        CodAcces:{
            type:Sequelize.STRING
        },
        DataInceput:{
            type:Sequelize.DATE
        },
        DataSfarsit:{
            type:Sequelize.DATE
        },
       TipActivitate: {
            type: Sequelize.STRING
        },
        
        
       
    }
)

export const Feedback = sequelize.define("Feedback",
    {

        IdFeedback: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
       Text: {
            type: Sequelize.STRING
        },
        Nota:{
            type:Sequelize.INTEGER
        },
      
        DataFeedback:{
            type:Sequelize.DATE
        }
    
       
    }
)

export const Profesori = sequelize.define("Profesori",
    {

        IdProfesor: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
        Nume: {
            type: Sequelize.STRING
        },

        Email: {
            type: Sequelize.STRING
        },
        Parola: {
            type: Sequelize.STRING
        }
    }
)
export const Studenti = sequelize.define("Studenti",
    {

        IdStudent: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: true
        },
        Nume: {
            type: Sequelize.STRING
        },
        Facultate: {
            type: Sequelize.STRING
        },
        Email: {
            type: Sequelize.STRING
        },
        Parola: {
            type: Sequelize.STRING
        },
        Cod: {
            type: Sequelize.STRING
        }
    }
)


Feedback.hasMany(Studenti, {foreignKey:"IdStudent", foreignKeyConstraint:true});
Feedback.hasMany(Activitati, {foreignKey:"IdActivitate", foreignKeyConstraint:true});

Activitati.hasMany(Profesori, {foreignKey:"IdProfesor", foreignKeyConstraint:true});



sequelize.authenticate()
.then(()=>{console.log("Sequelize has succesfully conected of the database")})
.catch(err => console.error("Unable to connect to the databse: ", err)); 



sequelize
.sync({force: true, alter: true})  
.then(()=> {console.log("Sync complete!")}) 
.catch(err =>console.log("Error at creating: "+ err));

// module.exports={
//     Activitati, Feedback, Studenti, Profesori
// }


module.exports= sequelize;

