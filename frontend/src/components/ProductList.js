import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, productId: null });

  // Fetch products
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  // Handle delete action
  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        alert(response.data.message); // Show success message
        // Remove deleted product from the list
        setProducts(products.filter((product) => product._id !== id));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
        setLoading(false);
      });
    setDeleteDialog({ open: false, productId: null });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Product Management
          </Typography>
          <Button
            color="green"
            component={Link}
            to="/add"
            startIcon={<AddIcon />}
            sx={{ fontWeight: 'bold' }}
          >
            Add Product
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom color="primary">
          Product List
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : products.length > 0 ? (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#dfce5f' }}>
                <TableRow>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell align="right" sx={{ color: '#fff', fontWeight: 'bold' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        startIcon={<EditIcon />}
                        component={Link}
                        to={`/edit/${product._id}`}
                        sx={{ marginRight: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteDialog({ open: true, productId: product._id })}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography align="center" sx={{ marginTop: 4 }}>
            No products found.
          </Typography>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, productId: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, productId: null })} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteDialog.productId)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
