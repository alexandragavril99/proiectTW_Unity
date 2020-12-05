import Sequelize from "sequelize";

export const sequelize = new Sequelize("database1", "sa1", "sa1", {
  host: "localhost",
  dialect: "mssql",
  dialectOptions: {
    option: {
      trustedConnection: true,
      enableArithAbort: true,
    },
  },
});

export const Activities = sequelize.define("Activity", {
  IdActivitate: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  Nume: {
    type: Sequelize.STRING,
  },
  CodAcces: {
    type: Sequelize.STRING,
  },
  DataInceput: {
    type: Sequelize.DATE,
  },
  DataSfarsit: {
    type: Sequelize.DATE,
  },
  TipActivitate: {
    type: Sequelize.STRING,
  },
});

export const Professors = sequelize.define("Professor", {
  IdProfesor: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  Nume: {
    type: Sequelize.STRING,
  },

  Email: {
    type: Sequelize.STRING,
  },
  Parola: {
    type: Sequelize.STRING,
  },
});

export const Students = sequelize.define("Student", {
  IdStudent: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  Nume: {
    type: Sequelize.STRING,
  },
  Facultate: {
    type: Sequelize.STRING,
  },
  Email: {
    type: Sequelize.STRING,
  },
  Parola: {
    type: Sequelize.STRING,
  },
  CodStudent: {
    type: Sequelize.STRING,
  },
});

export const Feedback = sequelize.define("Feedback", {
  IdFeedback: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  Text: {
    type: Sequelize.STRING,
  },
  Nota: {
    type: Sequelize.INTEGER,
  },

  DataFeedback: {
    type: Sequelize.DATE,
  },
});

Professors.hasMany(Activities, {
  foreignKey: "IdProfesor",
  foreignKeyConstraint: true,
});

Students.hasMany(Feedback, {
  foreignKey: "CodStudent",
  foreignKeyConstraint: true,
});

Activities.hasMany(Feedback, {
  foreignKey: "IdActivitate",
  foreignKeyConstraint: true,
});
