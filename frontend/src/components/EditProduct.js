import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { LogContext } from '../LogContext';

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { addLog } = useContext(LogContext); // Get the addLog function from LogContext

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/products/${id}`)
        .then(response => {
          const product = response.data;
          setName(product.name);
          setPrice(product.price);
          setQuantity(product.quantity);
        })
        .catch(error => {
          console.error('Error fetching product:', error);
          setErrorMessage('Failed to fetch product data.');
        });
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation: Check if the fields are valid
    if (!name || !price || !quantity) {
      setErrorMessage('All fields are required.');
      return;
    }

    const updatedProduct = { name, price, quantity };

    // Capture the old values
    const oldPrice = price;
    const oldQuantity = quantity;

    axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct)
      .then(response => {
        // Log the changes
        addLog(name, oldPrice, oldQuantity, price, quantity);  // Add log with product name, old and new values

        setSuccessMessage('Product updated successfully!');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/'); // Navigate to the homepage or product list
        }, 2000);
      })
      .catch(error => {
        console.error('Error updating product:', error);
        setErrorMessage('Error updating product. Please try again.');
        setSuccessMessage('');
      });
  };

  // Go back to the previous page
  const goBack = () => {
    navigate(-1); // Navigate to the previous page in the browser history
  };

  return (
    <Container sx={{ maxWidth: 'sm', paddingTop: 4 }}>
      <Box sx={{ boxShadow: 3, padding: 4, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 3, color: 'primary.main' }}>
          Edit Product
        </Typography>

        {/* Go Back Button */}
        <Button
          onClick={goBack}
          variant="outlined"
          sx={{ marginBottom: 3 }}
          fullWidth
          startIcon={<ArrowBackIcon />}
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
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Product Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
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
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            fullWidth
            required
            min="1"
            sx={{ marginBottom: 3 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Product
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditProduct;
