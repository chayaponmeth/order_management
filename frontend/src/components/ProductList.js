// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price} 
            <Link to={`/edit/${product._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/add">Add New Product</Link>
    </div>
  );
};

export default ProductList;
