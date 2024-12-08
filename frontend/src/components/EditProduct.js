// src/components/EditProduct.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then(response => {
          const product = response.data;
          setName(product.name);
          setPrice(product.price);
          setQuantity(product.quantity);
        })
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedProduct = { name, price, quantity };

    axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct)
      .then(response => {
        console.log('Product updated:', response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} required />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
