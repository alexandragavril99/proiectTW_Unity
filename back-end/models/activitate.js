
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