import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Order Management System
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
                        <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>Orders</Link>
                        <Link to="/customers" style={{ color: 'white', textDecoration: 'none' }}>Customers</Link>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                {children}
            </Container>
        </>
    );
};

export default Layout;
