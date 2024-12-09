// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        alert(response.data.message); // Show success message
        // Remove deleted product from the list
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      });
  };

  return (
    <div className="product-list-container">
      <h2 className="text-center">Product List</h2>
      {products.length > 0 ? (
        <ul className="list-group">
          {products.map(product => (
            <li key={product._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{product.name} - ${product.price}</span>
              <div>
                <Link to={`/edit/${product._id}`} className="btn btn-warning btn-sm mr-2">Edit</Link>
                <button onClick={() => handleDelete(product._id)} className="btn btn-danger btn-sm">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
      <Link to="/add" className="btn btn-primary mt-3">Add New Product</Link>
    </div>
  );
};

export default ProductList;
