import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, createTheme, ThemeProvider, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import LogPage from './LogPage'; // Import LogPage
import { LogProvider } from './LogContext';

// Create a custom theme with primary color
const theme = createTheme({
  palette: {
    primary: {
      main: '#6362e2', // Main color for primary
    },
    secondary: {
      main: '#92929c', // Main color for secondary
    },
  },
});

function App() {
  return (
    <LogProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Box
            sx={{
              minHeight: '100vh',
              backgroundImage: 'url(https://www.hashmicro.com/blog/wp-content/uploads/2022/08/1yhvq.jpg)', // Background image with fallback gradient color
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat', // Prevent image repeat
            }}
          >
            <AppBar position="static">
              <Toolbar>
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: 'center',
                    color: '#444',
                    fontWeight: 'bold',
                    backgroundColor: '#e2bd2a',
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 2,
                    maxWidth: '80%',
                    margin: '0 auto',
                  }}
                >
                  Inventory System
                </Typography>
                <Button color="inherit" variant="outlined" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" variant="outlined" component={Link} to="/logs">
                  Logs
                </Button> {/* Added the Log page button */}
              </Toolbar>
            </AppBar>

            <Container sx={{ paddingTop: 4 }}>
              <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/add" element={<AddProduct />} />
                <Route path="/edit/:id" element={<EditProduct />} />
                <Route path="/logs" element={<LogPage />} />

              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </LogProvider>
  );
}

export default App;
