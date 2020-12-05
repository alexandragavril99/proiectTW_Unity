import sequelize from '../config/dbconfig.js'
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