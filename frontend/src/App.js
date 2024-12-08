// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList.js';
import AddProduct from './components/AddProduct.js';
import EditProduct from './components/EditProduct.js';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Inventory System</h1>
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
