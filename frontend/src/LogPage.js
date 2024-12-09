// src/LogPage.js
import React, { useContext } from 'react';
import { LogContext } from './LogContext';
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Pagination, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogPage = () => {
  const { logs } = useContext(LogContext);
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayedLogs = logs.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Container sx={{ paddingTop: 4 }}>
      <Box sx={{ boxShadow: 3, padding: 4, borderRadius: 2, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 3, color: 'primary.main' }}>
          Product Change Logs
        </Typography>

        <TableContainer component={Paper} sx={{ marginBottom: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center"><strong>Product Name</strong></TableCell>
                <TableCell align="center"><strong>Old Quantity</strong></TableCell>
                <TableCell align="center"><strong>Old Price</strong></TableCell>
                <TableCell align="center"><strong>New Quantity</strong></TableCell>
                <TableCell align="center"><strong>New Price</strong></TableCell>
                <TableCell align="center"><strong>Timestamp</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{log.productName}</TableCell>
                  <TableCell align="center">{log.oldQuantity}</TableCell>
                  <TableCell align="center">{log.oldPrice}</TableCell>
                  <TableCell align="center">{log.newQuantity}</TableCell>
                  <TableCell align="center">{log.newPrice}</TableCell>
                  <TableCell align="center">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Grid container justifyContent="center">
          <Pagination
            count={Math.ceil(logs.length / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            size="large"
          />
        </Grid>

        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/')} sx={{ padding: '8px 16px' }}>
            Go Back to Product List
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LogPage;
