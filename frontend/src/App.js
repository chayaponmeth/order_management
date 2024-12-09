import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

// Create a custom theme with primary color
const theme = createTheme({
  palette: {
    primary: {
      main: '#6362e2',  // Main color for primary
    },
    secondary: {
      main: '#92929c',  // Main color for secondary
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h4"
                sx={{
                  textAlign: 'center', // จัดตำแหน่งข้อความให้อยู่ตรงกลาง
                  color: '#444', // ใช้สีหลักจากธีม
                  fontWeight: 'bold', // ทำให้ข้อความหนาขึ้น
                  backgroundColor: '#e2bd2a', // ใช้สีรองจากธีม
                  padding: 2, // เพิ่มช่องว่างรอบๆ ข้อความ
                  borderRadius: 1, // เพิ่มขอบมนให้กับพื้นหลัง
                  boxShadow: 2, // เพิ่มเงาให้ดูมีมิติ
                  maxWidth: '80%', // กำหนดความกว้างสูงสุด
                  margin: '0 auto', // จัดให้อยู่กลางหน้าจอ
                }}
              >
                Inventory System
              </Typography>
              <Button color="inherit" variant="outlined" component={Link} to="/">Home</Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ paddingTop: 4 }}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/edit/:id" element={<EditProduct />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
