// 

/*==================================================
/database/db.js

Sets up Sequelize with the Postgres database.
==================================================*/

// Import Sequelize
const { Sequelize } = require('sequelize');

// Use DATABASE_URL from environment variables (Neon.tech)
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL connection for Neon.tech
      rejectUnauthorized: false, // Bypass SSL certificate verification
    },
  },
  logging: false, // Disable logging for cleaner output (optional)
});

// Display a confirmation message for opening a database connection
console.log('✅ Connecting to PostgreSQL database...');

module.exports = db;
