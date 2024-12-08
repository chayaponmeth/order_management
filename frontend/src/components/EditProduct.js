import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();  // useNavigate instead of useHistory

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(response => {
        setName(response.data.name);
        setPrice(response.data.price);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { name, price };
    axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct)
      .then(() => {
        navigate('/');  // Using navigate to redirect after the update
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
