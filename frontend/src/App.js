// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';  // อย่าลืมสร้าง Component นี้
import AddProduct from './components/AddProduct';    // อย่าลืมสร้าง Component นี้
import EditProduct from './components/EditProduct';  // อย่าลืมสร้าง Component นี้

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Inventory System</h1>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/add" component={AddProduct} />
          <Route path="/edit/:id" component={EditProduct} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;


