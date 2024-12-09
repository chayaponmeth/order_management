import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box, Alert, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        navigate('/'); // Navigate to the product list page after a short delay
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
    <Container sx={{ maxWidth: 'sm', padding: 4 }}>
      <Box sx={{ boxShadow: 3, padding: 4, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 3, color: 'primary.main' }}>
          Add New Product
        </Typography>

        <Button
          onClick={goBack}
          variant="outlined"
          sx={{ marginBottom: 3 }}
          fullWidth
          startIcon={<ArrowBackIcon />} // เพิ่มไอคอนย้อนกลับที่นี่
        >
          Go Back
        </Button>

        {/* Display Success or Error Message */}
        {successMessage && <Alert severity="success" sx={{ marginBottom: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            variant="outlined"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Product Price"
            variant="outlined"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            fullWidth
            required
            min="0.01"
            step="0.01"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Product Quantity"
            variant="outlined"
            type="number"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            fullWidth
            required
            min="1"
            sx={{ marginBottom: 3 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddProduct;
