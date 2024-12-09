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
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, productId: null });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // State สำหรับการจัดเรียง

  // Fetch products from the server
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

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm)
  );

  // Sort products based on price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
  });

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
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
            variant="contained"
            color="success"
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

        {/* Search and Sort Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search by name or price"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: '100%', maxWidth: 400 }}
          />
          <Button
            variant="contained"
            startIcon={<SortIcon />}
            onClick={toggleSortOrder}
            sx={{ marginLeft: 2 }}
          >
            Sort by Price ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
          </Box>
        ) : sortedProducts.length > 0 ? (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead sx={{ backgroundColor: '#dfce5f' }}>
                <TableRow>
                  <TableCell sx={{ color: '#444', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: '#444', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell sx={{ color: '#444', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell align="right" sx={{ color: '#444', fontWeight: 'bold' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedProducts.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color = "info"
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
