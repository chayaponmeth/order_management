// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList.js';
import AddProduct from './components/AddProduct.js';
import EditProduct from './components/EditProduct.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Inventory System</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Product List</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Product</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="container mt-5">
          <Routes>
            {/* Define your routes here */}
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
