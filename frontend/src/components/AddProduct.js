import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare product data to be sent
    const productData = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log('Product added:', response.data);
      alert('Product added successfully');
    } catch (error) {
      console.error('There was an error adding the product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Product Price:
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </label>
      <br />
      <label>
        Product Quantity:
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
