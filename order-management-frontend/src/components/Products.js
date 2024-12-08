import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Paper } from '@mui/material';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
    };

    const handleAddProduct = async () => {
        await axios.post('http://localhost:5000/products', newProduct);
        fetchProducts();
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>Products</Typography>
            <Paper sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>Add Product</Typography>
                <TextField label="Name" variant="outlined" fullWidth sx={{ mb: 2 }} 
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                <TextField label="Price" variant="outlined" fullWidth sx={{ mb: 2 }} 
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                <TextField label="Stock" variant="outlined" fullWidth sx={{ mb: 2 }} 
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                <Button variant="contained" color="primary" onClick={handleAddProduct}>Add Product</Button>
            </Paper>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Stock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default Products;
