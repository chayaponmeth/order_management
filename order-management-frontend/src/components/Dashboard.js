import React from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

const Dashboard = () => {
    return (
        <>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Products</Typography>
                            <Typography variant="h4" color="primary">50</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Total Orders</Typography>
                            <Typography variant="h4" color="secondary">120</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Pending Orders</Typography>
                            <Typography variant="h4" color="error">15</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default Dashboard;
