// db.js
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',      // MySQL server
  user: 'root',           // MySQL username
  password: 'Poohpooh_1', // MySQL password
  database: 'inventory_system', // Database name
});

// Export the pool as a promise-based interface for async queries
module.exports = pool.promise();
