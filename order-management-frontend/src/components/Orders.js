import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, MenuItem, Paper } from '@mui/material';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [filterStatus, setFilterStatus] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        if (filterStatus) {
            setFilteredOrders(orders.filter(order => order.status === filterStatus));
        } else {
            setFilteredOrders(orders);
        }
    }, [filterStatus, orders]);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:5000/orders');
        setOrders(response.data);
    };

    const handleUpdateStatus = async (id, status) => {
        await axios.put(`http://localhost:5000/orders/${id}`, { status });
        fetchOrders();
    };

    return (
        <>
            <Typography variant="h4" gutterBottom>Orders</Typography>
            <Paper sx={{ padding: 2, marginBottom: 4 }}>
                <TextField
                    label="Filter by Status"
                    select
                    fullWidth
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                </TextField>
            </Paper>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredOrders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.Customer.name}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.total_amount}</TableCell>
                                <TableCell>
                                    {order.status !== 'Shipped' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                                        >
                                            Mark as Shipped
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </>
    );
};

export default Orders;
