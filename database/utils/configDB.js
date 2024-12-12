/*==================================================
/database/utils/configDB.js

It declares and exports the variables for database name, username, and password.
==================================================*/
// Declare the variables for database name, username, and password.
const dbName = 'campus_management_dev';
const dbUser = 'adelinadautovic';
const dbPwd = null;  // Note: If needed, change this password to match the password created for PostgreSQL database on the local machine.

// Export the variables 
module.exports = {
  dbName,
  dbUser,
  dbPwd
};
