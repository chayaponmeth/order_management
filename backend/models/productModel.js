// backend/models/productModel.js
const db = require('../config/db');

const getProducts = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const createProduct = (product) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO products SET ?', product, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const updateProduct = (id, product) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE products SET ? WHERE id = ?', [product, id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
