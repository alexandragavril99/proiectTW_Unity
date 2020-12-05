import sequelize from '../config/dbconfig.js'
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
