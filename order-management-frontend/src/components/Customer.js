import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Paper } from '@mui/material';
import axios from 'axios';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', phone: '' });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
    };

    const handleAddCustomer = async () => {
        await axios.post('http://localhost:5000/customers', newCustomer);
        fetchCustomers();
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>Customers</Typography>
            <Paper sx={{ padding: 2, marginBottom: 4 }}>
                <Typography variant="h6" gutterBottom>Add Customer</Typography>
                <TextField label="Name" variant="outlined" fullWidth sx={{ mb: 2 }} 
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} />
                <TextField label="Email" variant="outlined" fullWidth sx={{ mb: 2 }} 
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} />
                <TextField label="Phone" variant="outlined" fullWidth sx={{ mb: 2 }} 
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} />
                <Button variant="contained" color="primary" onClick={handleAddCustomer}>Add Customer</Button>
            </Paper>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map(customer => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.id}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default Customers;
