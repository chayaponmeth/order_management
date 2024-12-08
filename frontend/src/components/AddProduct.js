import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!productName || !productPrice || !productQuantity) {
      alert('All fields are required.');
      return;
    }

    const productData = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log('Product added:', response.data);
      alert('Product added successfully');
      setProductName('');
      setProductPrice('');
      setProductQuantity('');
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Failed to add product: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Add Product</h2>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </label>
      <label>
        Product Price:
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </label>
      <label>
        Product Quantity:
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
      </label>
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
