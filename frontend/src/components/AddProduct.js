import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation to check if fields are empty or invalid
    if (!productName || !productPrice || !productQuantity) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (productPrice <= 0 || productQuantity <= 0) {
      setErrorMessage('Price and quantity must be greater than zero.');
      return;
    }

    // Prepare product data to be sent
    const productData = {
      name: productName,
      price: parseFloat(productPrice),
      quantity: parseInt(productQuantity),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log('Product added:', response.data);
      setSuccessMessage('Product added successfully');
      setErrorMessage('');
      // Optionally, you can navigate to another page after the product is added
      setTimeout(() => {
        navigate('/products'); // Navigate to the product list page after a short delay
      }, 2000);
    } catch (error) {
      console.error('There was an error adding the product:', error);
      setErrorMessage('Failed to add product. Please try again.');
      setSuccessMessage('');
    }
  };

  // Go back to the previous page
  const goBack = () => {
    navigate(-1); // This navigates to the previous page in the browser history
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="text-center mb-4">Add New Product</h2>
        <button onClick={goBack} className="btn btn-secondary mb-3">Go Back</button> {/* Go Back Button */}
        
        {/* Display Success or Error Message */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="form-control"
              min="0.01" step="0.01" // To avoid zero or negative price
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Quantity</label>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className="form-control"
              min="1" // Ensure quantity is positive
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
