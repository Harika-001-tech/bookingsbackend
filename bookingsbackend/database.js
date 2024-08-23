const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite' // SQLite file
});

// Define the Mentor model
const Mentor = sequelize.define('Mentor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  expertise: {
    type: DataTypes.STRING,
    allowNull: false
  },
  premium: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Define the Booking model
const Booking = sequelize.define('Booking', {
  studentName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mentorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Mentor,
      key: 'id'
    }
  },
  duration: {
    type: DataTypes.INTEGER, // Duration in minutes (30, 45, 60)
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// Sync the models with the database
sequelize.sync();

module.exports = { sequelize, Mentor, Booking };
