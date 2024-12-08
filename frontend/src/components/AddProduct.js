// src/components/AddProduct.js (after)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate instead of useHistory

const AddProduct = () => {
  const navigate = useNavigate();  // Use useNavigate
  const [productName, setProductName] = useState('');

  const handleSubmit = () => {
    // Add product logic here
    // After adding the product, redirect to another page
    navigate('/products');  // Use navigate instead of history.push
  };

  return (
    <div>
      <input 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)} 
        placeholder="Product Name"
      />
      <button onClick={handleSubmit}>Add Product</button>
    </div>
  );
};

export default AddProduct;
