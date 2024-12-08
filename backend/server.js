const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',      // MySQL server
  user: 'root',           // MySQL username
  password: 'Poohpooh_1', // MySQL password
  database: 'inventory_system', // Database name
});

// Example route to get all products
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.promise().execute('SELECT * FROM products');
    res.json(rows);  // Return the products as JSON
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// Route to add a new product
app.post('/api/products', async (req, res) => {
  const { name, price, quantity } = req.body;

  // Check if all required fields are provided
  if (!name || !price || !quantity) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Insert new product into the database
    await pool.promise().execute('INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)', [name, price, quantity]);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).json({ message: 'Error adding product', error: err });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
