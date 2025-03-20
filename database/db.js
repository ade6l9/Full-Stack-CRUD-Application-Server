// // 

// /*==================================================
// /database/db.js

// Sets up Sequelize with the Postgres database.
// ==================================================*/

// // Import Sequelize
// const { Sequelize } = require('sequelize');

// // Use DATABASE_URL from environment variables (Neon.tech)
// const db = new Sequelize(process.env.DATABASE_URL, {
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       require: true, // Ensure SSL connection for Neon.tech
//       rejectUnauthorized: false, // Bypass SSL certificate verification
//     },
//   },
//   logging: false, // Disable logging for cleaner output (optional)
// });

// // Display a confirmation message for opening a database connection
// console.log('✅ Connecting to PostgreSQL database...');

// module.exports = db;


const { Sequelize } = require('sequelize');

// Ensure DATABASE_URL is being used
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not set. Make sure it is in your Render environment variables.');
  process.exit(1);
}

// Initialize Sequelize with the DATABASE_URL
const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,  // Required for Neon.tech
      rejectUnauthorized: false,
    },
  },
  logging: false,  // Disable logs (optional)
});

// Log success or failure
db.authenticate()
  .then(() => console.log('✅ Connected to Neon.tech PostgreSQL'))
  .catch(err => console.error('❌ Database Connection Error:', err));

module.exports = db;
