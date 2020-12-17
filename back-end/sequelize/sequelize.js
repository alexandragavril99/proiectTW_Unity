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
  IdActivity: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  Name: {
    type: Sequelize.STRING,
  },
  AccessCode: {
    type: Sequelize.STRING,
  },
  StartDate: {
    type: Sequelize.DATE,
  },
  FinalDate: {
    type: Sequelize.DATE,
  },
  ActivityType: {
    type: Sequelize.STRING,
  },
});

export const Users = sequelize.define("User", {
  IdUser: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true,
  },
  Name: {
    type: Sequelize.STRING,
  },

  Email: {
    type: Sequelize.STRING,
  },
  Password: {
    type: Sequelize.STRING,
  },
  isProfessor: {
    type: Sequelize.BOOLEAN,
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
  Grade: {
    type: Sequelize.INTEGER,
  },

  FeedbackDate: {
    type: Sequelize.DATE,
  },
});

Users.hasMany(Activities, {
  foreignKey: "IdUser",
  foreignKeyConstraint: true,
});

Users.hasMany(Feedback, {
  foreignKey: "IdUser",
  foreignKeyConstraint: true,
});

Activities.hasMany(Feedback, {
  foreignKey: "IdActivity",
  foreignKeyConstraint: true,
});
