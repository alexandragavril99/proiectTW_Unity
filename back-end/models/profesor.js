
import sequelize from '../config/dbconfig.js'
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