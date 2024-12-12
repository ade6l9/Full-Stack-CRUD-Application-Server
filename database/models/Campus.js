/*==================================================
/database/models/Campus.js

It defines the campus model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the campus model
const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING,
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true, // Image URL can be null
    defaultValue: 'https://via.placeholder.com/150', // Default image URL
    validate: {
      isUrl: true // Ensures it's a valid URL
    },
  }
});

// Export the campus model
module.exports = Campus;