/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Destructure DataTypes from Sequelize
const { DataTypes } = Sequelize;

// Define the Student model
const Student = db.define('student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  imageurl: { 
    type: DataTypes.STRING,
    defaultValue: 'https://via.placeholder.com/150',
  },
  gpa: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  campusId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'campuses', 
      key: 'id',
    },
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Export the Student model
module.exports = Student;